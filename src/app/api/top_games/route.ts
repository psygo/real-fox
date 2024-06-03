import "server-only"

import { type NextRequest } from "next/server"

async function getTopPlayers() {
  const foxUser = process.env.NEXT_FOX_API_USER!
  const foxPassword =
    process.env.NEXT_FOX_API_PASSWORD_HASH!

  const headers = new Headers()
  headers.append(
    "Authorization",
    `Basic ${btoa(foxUser + ":" + foxPassword)}`,
  )

  const res = await fetch(
    "https://foxwq-8e6797d8dbb9.herokuapp.com/api/v1/top_games",
    {
      headers,
      mode: "no-cors",
    },
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const topPlayersData = await res.json()

  console.log("data", topPlayersData)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return topPlayersData
}

export async function POST(_: NextRequest) {
  try {
    await getTopPlayers()
  } catch (e) {
    console.error(e)
  }
}
