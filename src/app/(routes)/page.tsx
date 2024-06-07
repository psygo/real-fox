import {
  deleteAllPlayers,
  getLastUpdateDate,
  getPlayers,
} from "@queries"

import { PlayersList } from "@components"
import { FetchButton } from "../../components/Players/FetchButton"

export default async function HomePage() {
  // await deleteAllPlayers()

  const players = (await getPlayers()) ?? []
  const lastUpdatedDate =
    (await getLastUpdateDate()) ?? new Date()

  return (
    <div className="flex flex-col items-center gap-2">
      <FetchButton
        apiPath="/me"
        method="GET"
        text="Fetch Me"
      />
      <FetchButton
        apiPath="/top-games"
        method="POST"
        text="Fetch and Update DB"
      />
      <h2 className="text-gray-400">
        Fox&apos;s Top 25 Players
      </h2>
      <h2 className="text-gray-400">
        Last Updated: {lastUpdatedDate?.toDateString()}
      </h2>
      <PlayersList players={players} />
    </div>
  )
}
