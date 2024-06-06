import {
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm"
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { players } from "@db"

export type SelectPlayer = InferSelectModel<typeof players>
export type InsertPlayer = InferInsertModel<typeof players>

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
