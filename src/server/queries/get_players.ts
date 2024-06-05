import e from "@schema"

export const playersSelect = e.select(
  e.Player,
  (player) => ({
    ...e.Player["*"],
    order_by: player.rank,
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

export const playersUpsert = e.params(
  {
    players: e.array(
      e.tuple({
        fox_id: e.int64,
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
            rank: Math.random(),
            windowed_wins: Math.random(),
            windowed_losses: playerRoot.windowed_losses,
          })
          .unlessConflict((player) => ({
            on: player.fox_id,
            else: e.update(player, () => ({
              set: {
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

export type PlayerUpsert = {
  fox_id: number
  rank: number
  windowed_wins: number
  windowed_losses: number
}
