import e from "@schema"

import { desc, inArray } from "drizzle-orm"

import { db, players } from "@db"

export const playersSelect = e.select(
  e.Player,
  (player) => ({
    ...e.Player["*"],
    order_by: {
      expression: player.rank,
      direction: e.DESC,
    },
  }),
)

export const playersSelectFromIds = e.params(
  { ids: e.array(e.int64) },
  ({ ids }) =>
    e.select(e.default.Player, (player) => ({
      ...e.Player["*"],
      filter: e.op(
        player.fox_id,
        "in",
        e.array_unpack(ids),
      ),
    })),
)

export async function getPlayers() {
  try {
    return await db
      .select()
      .from(players)
      .orderBy(desc(players.rank))
      .limit(20)
  } catch (error) {
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
