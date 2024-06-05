import { edgeDbClient } from "@db"

import { playersSelect } from "@queries"

import { PlayersList } from "@components"

// import { exampleTopGamesList } from "../api/top_games/example_top_games_list"
// import { updatePlayersRanks } from "../api/top_games/route"

export default async function HomePage() {
  // const updatedPlayers = await updatePlayersRanks(
  //   exampleTopGamesList,
  // )

  // console.log("updated players", updatedPlayers)

  // await playersUpsert.run(edgeDbClient, {
  //   players: Object.values(updatedPlayers),
  // })

  const players = await playersSelect.run(edgeDbClient)

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-gray-400">Fox Top Players</h2>
      <PlayersList players={players} />
    </div>
  )
}
