import { type SelectPlayer } from "@types"

import { PlayerCard } from "./PlayerCard"

type PlayersListProps = {
  players: SelectPlayer[]
}

export function PlayersList({ players }: PlayersListProps) {
  return (
    <div className="flex max-w-[600px] flex-col gap-2">
      {players.map((p) => (
        <PlayerCard key={p.fox_id} player={p} />
      ))}
    </div>
  )
}
