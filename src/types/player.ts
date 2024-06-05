import { type $infer } from "@schema"

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { playersSelect } from "@queries"

export type PlayersSelect = $infer<typeof playersSelect>

export type PlayerSelect = PlayersSelect[0]

export type PlayerUpsert = {
  fox_id: number
  nick: string
  name: string
  rank: number
  ai: boolean
  country: string
  windowed_wins: number
  windowed_losses: number
}

export type Fox_PlayerInfo = {
  id: number | bigint
  nick: string
  name: string
  rank: string
  country: string
  gender: string
  flair: string
  ai: boolean
  amateur_6d: boolean
  register_time: number
  results: {
    wins: number
    losses: number
    draws: number
  }
  recent_results: string
  status: {
    online: boolean
    accepting_games: boolean
  }
}
