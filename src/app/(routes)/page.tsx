import { getPlayers } from "@queries"

import { PlayersList } from "@components"
import { FetchButton } from "../../components/Players/FetchButton"

// import { exampleTopGamesList } from "../api/top_games/example_top_games_list"
// import { updatePlayersRanks } from "../api/top_games/update_players_ranks"

export default async function HomePage() {
  // const updatedPlayers = await updatePlayersRanks(
  //   exampleTopGamesList,
  // )

  // console.log("updated players", updatedPlayers)

  const players = (await getPlayers()) ?? []

  return (
    <div className="flex flex-col items-center gap-2">
      <FetchButton />
      <h2 className="text-gray-400">Fox Top Players</h2>
      <PlayersList players={players} />
    </div>
  )
}
