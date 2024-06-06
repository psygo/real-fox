import { nanoid } from "nanoid"

import { sql } from "drizzle-orm"
import {
  boolean,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const createTable = pgTableCreator(
  (name) => `real_fox_${name}`,
)

export function standardNanoid(length = 8) {
  return nanoid(length)
}

function idCols() {
  return {
    id: serial("id").primaryKey(),
    nanoId: varchar("nano_id", { length: 256 })
      .unique()
      .notNull()
      .$defaultFn(() => standardNanoid()),
  }
}

function dateTimeCols() {
  return {
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
}

export const players = createTable("players", {
  // IDs
  ...idCols(),
  // DB Metadata
  ...dateTimeCols(),
  // Fox Data
  real_name: varchar("real_name", { length: 256 }),
  nick: varchar("nick", { length: 256 }).notNull(),
  name: varchar("nick", { length: 256 }).notNull(),
  country: varchar("country", { length: 256 }).notNull(),
  ai: boolean("ai").notNull().default(false),
  // Ranking Data
  rank: integer("rank").notNull(),
  windowed_wins: integer("windowed_wins").notNull(),
  windowed_losses: integer("windowed_losses").notNull(),
})
