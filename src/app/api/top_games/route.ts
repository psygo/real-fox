import "server-only"

import { type Fox_Game, type Fox_PlayerInfo } from "@types"

const headers = new Headers()
headers.append("X-APP-ID", process.env.NEXT_FOX_API_ID!)
headers.append("X-API-KEY", process.env.NEXT_FOX_API_KEY!)
headers.append(
  "Authorization",
  `Basic ${process.env.NEXT_FOX_API_AUTH}`,
)

const API =
  "https://foxwq-8e6797d8dbb9.herokuapp.com/api/v1"

async function fetchPlayerInfo(id: number | bigint) {
  const res = await fetch(`${API}/players/${id}`, {
    headers,
  })

  return (await res.json()) as Fox_PlayerInfo
}

async function fetchTopGames() {
  const res = await fetch(`${API}/top_games`, { headers })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (await res.json()) as Fox_Game[]
}

enum RankEval {
  Up1,
  Up2,
  Down1,
  Down2,
  Stay,
}

// TODO: What if the player gets downgraded and then reappears? It should be reset to 9d...
function evalStreak(streak: string) {
  const wins = streak.match(/\+/g)?.length ?? 0
  const losses = streak.match(/\-/g)?.length ?? 0

  if (wins >= 18) return RankEval.Up2
  else if (wins >= 14) return RankEval.Up1
  else if (losses <= 18) return RankEval.Down2
  else if (losses <= 14) return RankEval.Down1
  else return RankEval.Stay
}

export async function POST() {
  try {
    const topGames = await fetchTopGames()

    const blackPlayersIds = topGames.map((g) => g.black.id)
    const whitePlayersIds = topGames.map((g) => g.white.id)
    const playersIds = new Set(
      blackPlayersIds.concat(whitePlayersIds),
    )

    const playersInfos = await Promise.all(
      [...playersIds].map((id) => fetchPlayerInfo(id)),
    )
  } catch (e) {
    console.error(e)
  }
}
