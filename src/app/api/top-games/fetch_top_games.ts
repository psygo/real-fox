import "@utils/array"

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

export const maxPageSize = 500
const topGamesSearchParams = new URLSearchParams()

export async function fetchTopGames(
  lastGameId: number | bigint = 0,
  pageSize = maxPageSize,
) {
  try {
    topGamesSearchParams.set(
      "page_size",
      pageSize.toString(),
    )
    if (lastGameId !== 0)
      topGamesSearchParams.set(
        "last_game_id",
        lastGameId.toString(),
      )

    const res = await fetch(
      `${API}/top_games?${topGamesSearchParams.toString()}`,
      { headers },
    )

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await res.json()

    const games = json as Fox_Game[]
    const nextLastGameId = games.last().id

    return { games, nextLastGameId }
  } catch (e) {
    console.error(e)
  }
}
