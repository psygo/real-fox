import e from "@schema"

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
            rank: Math.random(),
            windowed_wins: Math.random(),
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
