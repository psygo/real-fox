import { db, players } from "@db"

export async function deleteAllUsers() {
  try {
    await db.delete(players)
  } catch (e) {
    console.error(e)
  }
}
