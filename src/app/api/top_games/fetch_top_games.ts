import { type Fox_Game } from "@types"

const headers = new Headers()
headers.append("X-APP-ID", process.env.NEXT_FOX_API_ID!)
headers.append("X-API-KEY", process.env.NEXT_FOX_API_KEY!)
headers.append(
  "Authorization",
  `Basic ${process.env.NEXT_FOX_API_AUTH}`,
)

const API =
  "https://foxwq-8e6797d8dbb9.herokuapp.com/api/v1"

export async function fetchTopGames() {
  const res = await fetch(`${API}/top_games`, { headers })
  return (await res.json()) as Fox_Game[]
}
