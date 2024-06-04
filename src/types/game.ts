export type Fox_GamePlayer = {
  id: number | bigint
  nick: string
  name: string
  rank: string
  country: string
  ai: boolean
}

export type Fox_Game = {
  id: number | bigint
  info: string
  black: Fox_GamePlayer
  white: Fox_GamePlayer
  start_time: string
  end_time: string
  settings: {
    board_size: number
    rules: string
    komi: number
    handicap: number
  }
  result: {
    winner: string
    reason: string
    score: number
  }
}
