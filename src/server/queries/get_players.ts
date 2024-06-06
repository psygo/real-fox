import { desc, inArray } from "drizzle-orm"

import { db, players } from "@db"

export async function getPlayers() {
  try {
    return await db
      .select()
      .from(players)
      .orderBy(desc(players.rank))
      .limit(50)
  } catch (e) {
    console.error(e)
  }
}

export async function getPlayersFromIds(ids: number[]) {
  try {
    return await db
      .select()
      .from(players)
      .where(inArray(players.fox_id, ids))
  } catch (e) {
    console.error(e)
  }
}
