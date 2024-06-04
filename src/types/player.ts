export type Fox_PlayerInfo = {
  id: number
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
