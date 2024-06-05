import { type Fox_Game } from "@types"

export const API =
  "https://foxwq-8e6797d8dbb9.herokuapp.com/api/v1"

export const headers = new Headers()
headers.append("X-APP-ID", process.env.NEXT_FOX_API_ID!)
headers.append("X-API-KEY", process.env.NEXT_FOX_API_KEY!)
headers.append(
  "Authorization",
  `Basic ${process.env.NEXT_FOX_API_AUTH}`,
)

const pageSize = 100
const topGamesSearchParams = new URLSearchParams()
topGamesSearchParams.set("page_size", pageSize.toString())

export async function fetchTopGames() {
  let lastGameId: number | bigint = 0
  let allGames: Fox_Game[] = []

  // let testCounter = 0

  while (true) {
    if (lastGameId)
      topGamesSearchParams.set(
        "last_game_id",
        lastGameId.toString(),
      )

    const addr = `${API}/top_games?${topGamesSearchParams.toString()}`
    console.log("addr", addr)

    const res = await fetch(
      `${API}/top_games?${topGamesSearchParams.toString()}`,
      { headers },
    )

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await res.json()

    if (json) {
      allGames = allGames.concat(json as Fox_Game[])
      lastGameId = allGames.at(-1)!.id
      console.log("all games length", allGames.length)
      // testCounter++
    } else break

    // if (testCounter > 1) break
  }

  return allGames
}
