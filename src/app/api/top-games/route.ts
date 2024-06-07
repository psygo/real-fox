import "server-only"

import { type NextRequest, NextResponse } from "next/server"

import "@utils/array"

import { type Fox_Game } from "@types"

import { getLastUpdateDate } from "@queries"

import { cronAuth } from "../cron_auth"

import {
  fetchTopGames,
  maxPageSize,
} from "./fetch_top_games"
import { updatePlayersRanks } from "./update_players_ranks"

export const dynamic = "force-dynamic"

type GamesTable = Record<string, Fox_Game>

function logGames(
  gamesTable: GamesTable,
  lastGameId: number | bigint,
) {
  console.log("---------------------------------------")
  console.log("lastGameId", lastGameId)
  console.log(
    "games length",
    Object.keys(gamesTable).length,
  )
  console.log("---------------------------------------")
}

export async function POST(req: NextRequest) {
  try {
    if (!cronAuth(req))
      return NextResponse.json({}, { status: 401 })

    // 0. Check if the last updated date is today. If so,
    //    don't do anything.
    const lastUpdatedDate = await getLastUpdateDate()
    const today = new Date()
    if (
      lastUpdatedDate?.toDateString() ===
      today.toDateString()
    ) {
      console.log("Repeated Games")
      return NextResponse.json({}, { status: 402 })
    }

    // 1. Get All the Top Games
    //    We need a hash table because the the timeout below
    //    might create concurrent requests, which might then
    //    create game copies.
    const allGamesTable: GamesTable = {}
    let lastGameId: number | bigint = 0
    const lastGameIds: (number | bigint)[] = []
    const pageSize = maxPageSize

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const topGamesIntervalId = setInterval(async () => {
      logGames(allGamesTable, lastGameId)

      const res = await fetchTopGames(lastGameId, pageSize)

      if (!res) {
        clearInterval(topGamesIntervalId)
        return
      }

      const { games: newGames, nextLastGameId } = res

      if (
        Object.keys(allGamesTable).includes(
          nextLastGameId.toString(),
        )
      )
        return

      if (
        newGames.length === 0 ||
        Object.keys(allGamesTable).length >= 5_000 // Around the max of daily games
      ) {
        logGames(allGamesTable, lastGameId)
        // 2. Update Ranks based on Each Game
        await updatePlayersRanks(
          Object.values(allGamesTable),
        )
        clearInterval(topGamesIntervalId)
        return
      }

      lastGameId = nextLastGameId
      lastGameIds.push(lastGameId)
      for (const newGame of newGames) {
        allGamesTable[newGame.id.toString()] = newGame
      }
    }, 3_000)

    return NextResponse.json({}, { status: 201 })
  } catch (e) {
    console.error(e)
  }
}
