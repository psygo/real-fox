import { deleteAllPlayers, getPlayers } from "@queries"

import { PlayersList } from "@components"
import { FetchButton } from "../../components/Players/FetchButton"

// import { exampleTopGamesList } from "../api/top_games/example_top_games_list"
// import { updatePlayersRanks } from "../api/top_games/update_players_ranks"

export default async function HomePage() {
  // const updatedPlayers = await updatePlayersRanks(
  //   exampleTopGamesList,
  // )

  // console.log("updated players", updatedPlayers)
  // await deleteAllPlayers()

  const players = (await getPlayers()) ?? []

  return (
    <div className="flex flex-col items-center gap-2">
      {/* <FetchButton
        apiPath="/me"
        method="GET"
        text="Fetch Me"
      />
      <FetchButton
        apiPath="/top-games"
        method="POST"
        text="Fetch and Update DB"
      /> */}
      <h2 className="text-gray-400">Fox Top 25 Players</h2>
      <PlayersList players={players} />
    </div>
  )
}
