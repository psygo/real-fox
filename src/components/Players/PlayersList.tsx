import {
  type PlayerSelect,
  type PlayersSelect,
} from "@queries"

type PlayersListProps = {
  players: PlayersSelect
}

export function PlayersList({ players }: PlayersListProps) {
  return players.map((p) => (
    <PlayerCard key={p.fox_id} player={p} />
  ))
}

type PlayerCardProps = {
  player: PlayerSelect
}

export function PlayerCard({ player }: PlayerCardProps) {
  return <div>{player.name}</div>
}
