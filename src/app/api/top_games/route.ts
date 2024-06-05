import "server-only"

import { NextResponse } from "next/server"

import "@utils/array"

import { type Fox_Game } from "@types"

import { edgeDbClient } from "@db"

import { deleteQuery } from "@queries"

import { exampleTopGamesList } from "./example_top_games_list"
import { fetchMe } from "./fetch_me"
import {
  fetchTopGames,
  maxPageSize,
} from "./fetch_top_games"
import { updatePlayersRanks } from "./update_players_ranks"

export async function POST() {
  try {
    // 1. Trigger a login on the API
    await fetchMe()

    // await deleteQuery.run(edgeDbClient)

    // 2. Get the Top Games
    let allGames: Fox_Game[] = []
    let lastGameId: number | bigint = 0
    const pageSize = maxPageSize
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const topGamesIntervalId = setInterval(async () => {
      const { games, nextLastGameId } = await fetchTopGames(
        lastGameId,
        pageSize,
      )

      if (games.length < pageSize) {
        // 3. Update Ranks based on Each Game
        await updatePlayersRanks(allGames)
        clearInterval(topGamesIntervalId)
      }

      lastGameId = nextLastGameId
      allGames = allGames.concat(games)

      console.log("top games length", allGames.length)
    }, 2_000)

    return NextResponse.json({}, { status: 201 })
  } catch (e) {
    console.error(e)
  }
}
