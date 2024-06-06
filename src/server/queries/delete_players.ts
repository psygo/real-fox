import { db, players } from "@db"

export async function deleteAllPlayers() {
  try {
    await db.delete(players)
  } catch (e) {
    console.error(e)
  }
}
