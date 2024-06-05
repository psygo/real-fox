import "server-only"

import { fetchTopGames } from "./fetch_top_games"
import { updatePlayersRanks } from "./update_players_ranks"

export async function POST() {
  try {
    const topGames = await fetchTopGames()

    await updatePlayersRanks(topGames)
  } catch (e) {
    console.error(e)
  }
}
