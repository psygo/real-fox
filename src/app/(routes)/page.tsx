import { edgeDbClient } from "@db"

import { playersSelect } from "@queries"

import { PlayersList } from "@components"

export default async function HomePage() {
  const players = await playersSelect.run(edgeDbClient)

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-gray-400">Fox Top Players</h2>
      <PlayersList players={players} />
    </div>
  )
}
