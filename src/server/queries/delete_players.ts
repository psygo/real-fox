import e from "@schema"

import { db, players } from "@db"

export const deleteQuery = e.delete(e.Player)

export async function deleteAllUsers() {
  try {
    await db.delete(players)
  } catch (e) {
    console.error(e)
  }
}
