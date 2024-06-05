import "server-only"

import { NextResponse } from "next/server"

import "@utils/array"

import { edgeDbClient } from "@db"

import { deleteQuery } from "@queries"

import { fetchMe } from "./fetch_me"
import { fetchTopGames } from "./fetch_top_games"
import { updatePlayersRanks } from "./update_players_ranks"
import { exampleTopGamesList } from "./example_top_games_list"

export async function POST() {
  try {
    // 1. Trigger a login on the API
    await fetchMe()

    // 2. Get the Top Games
    const topGames = await fetchTopGames()
    console.log(
      "top games length",
      topGames.first(),
      topGames.last(),
    )

    // await deleteQuery.run(edgeDbClient)

    // 3. Update Ranks based on Each Game
    // await updatePlayersRanks(exampleTopGamesList)

    return NextResponse.json({}, { status: 201 })
  } catch (e) {
    console.error(e)
  }
}
