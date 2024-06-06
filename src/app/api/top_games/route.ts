import "server-only"

import { NextResponse } from "next/server"

import "@utils/array"

import { type Fox_Game } from "@types"

import { fetchMe } from "./fetch_me"
import {
  fetchTopGames,
  maxPageSize,
} from "./fetch_top_games"
import { updatePlayersRanks } from "./update_players_ranks"

type GamesHashTable = Record<string, Fox_Game[]>

function gamesHashTableToArray(table: GamesHashTable) {
  const values = Object.values(table)
  return values.flat()
}

function gamesHashTableLength(table: GamesHashTable) {
  return gamesHashTableToArray(table).length
}

export async function POST() {
  try {
    // 1. Trigger a login on the API
    await fetchMe()

    // 2. Get All the Top Games
    //    We need a hash table because the the timeout below
    //    might create concurrent requests, which might then
    //    create game copies.
    const allGamesHashTable: Record<string, Fox_Game[]> = {}
    let lastGameId: number | bigint = 0
    const pageSize = maxPageSize

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const topGamesIntervalId = setInterval(async () => {
      console.log("---------------------------------------")
      console.log("lastGameId", lastGameId)
      console.log(
        "games length",
        gamesHashTableLength(allGamesHashTable),
      )
      console.log("---------------------------------------")

      const res = await fetchTopGames(lastGameId, pageSize)

      if (!res) {
        clearInterval(topGamesIntervalId)
        return
      }

      const { games, nextLastGameId } = res

      if (
        Object.keys(allGamesHashTable).includes(
          nextLastGameId.toString(),
        )
      )
        return

      if (
        games.length === 0 ||
        gamesHashTableLength(allGamesHashTable) >= 5_000 // Around the max of daily games
      ) {
        // 3. Update Ranks based on Each Game
        await updatePlayersRanks(
          gamesHashTableToArray(allGamesHashTable),
        )
        clearInterval(topGamesIntervalId)
        return
      }

      lastGameId = nextLastGameId
      allGamesHashTable[lastGameId.toString()] = games
    }, 3_000)

    return NextResponse.json({}, { status: 201 })
  } catch (e) {
    console.error(e)
  }
}
