import { desc } from "drizzle-orm"

import "@utils/array"

import { db, players } from "@db"

export async function getLastUpdateDate() {
  try {
    const lastUpdatedPlayer = await db
      .select()
      .from(players)
      .orderBy(desc(players.updatedAt))
      .limit(1)

    return lastUpdatedPlayer.first().updatedAt
  } catch (e) {
    console.error(e)
  }
}
