import { edgeDbClient } from "@db"

import { playersSelect } from "@queries"

import { PlayersList } from "@components"

export default async function HomePage() {
  const players = await playersSelect.run(edgeDbClient)

  return <PlayersList players={players} />
}
