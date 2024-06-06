import e from "@schema"

import { type InsertPlayer } from "@types"

import { db, players } from "@db"
import { sql } from "drizzle-orm"

export const playersUpsert = e.params(
  {
    players: e.array(
      e.tuple({
        fox_id: e.int64,
        nick: e.str,
        name: e.str,
        ai: e.bool,
        country: e.str,
        rank: e.int16,
        windowed_wins: e.int16,
        windowed_losses: e.int16,
      }),
    ),
  },
  (params) => {
    return e.for(
      e.array_unpack(params.players),
      (playerRoot) => {
        return e
          .insert(e.default.Player, {
            fox_id: playerRoot.fox_id,
            nick: playerRoot.nick,
            name: playerRoot.name,
            ai: playerRoot.ai,
            country: playerRoot.country,
            rank: playerRoot.rank,
            windowed_wins: playerRoot.windowed_wins,
            windowed_losses: playerRoot.windowed_losses,
          })
          .unlessConflict((player) => ({
            on: player.fox_id,
            else: e.update(player, () => ({
              set: {
                nick: playerRoot.nick,
                name: playerRoot.name,
                ai: playerRoot.ai,
                country: playerRoot.country,
                rank: playerRoot.rank,
                windowed_wins: playerRoot.windowed_wins,
                windowed_losses: playerRoot.windowed_losses,
                updated_at: new Date(),
              },
            })),
          }))
      },
    )
  },
)

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
