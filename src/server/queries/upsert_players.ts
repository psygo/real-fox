import { sql } from "drizzle-orm"

import { type InsertPlayer } from "@types"

import { db, players } from "@db"

export async function upsertPlayers(
  newPlayers: InsertPlayer[],
) {
  try {
    await db
      .insert(players)
      .values(newPlayers)
      .onConflictDoUpdate({
        target: players.fox_id,
        set: {
          nick: sql`excluded.nick`,
          name: sql`excluded.name`,
          ai: sql`excluded.ai`,
          country: sql`excluded.country`,
          windowed_wins: sql`excluded.windowed_wins`,
          windowed_losses: sql`excluded.windowed_losses`,
          updatedAt: new Date(),
        },
      })
  } catch (e) {
    console.error(e)
  }
}
