import "server-only"

import { NextResponse } from "next/server"

import { edgeDbClient } from "@db"

import { deleteQuery } from "@queries"

import { fetchTopGames } from "./fetch_top_games"
import { updatePlayersRanks } from "./update_players_ranks"
import { exampleTopGamesList } from "./example_top_games_list"

export async function POST() {
  try {
    // const topGames = await fetchTopGames()

    // console.log("top games", topGames.length)
    await deleteQuery.run(edgeDbClient)

    await updatePlayersRanks(exampleTopGamesList)

    return NextResponse.json({}, { status: 201 })
  } catch (e) {
    console.error(e)
  }
}
