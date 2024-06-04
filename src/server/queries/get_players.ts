import e, { type $infer } from "@schema"

export const playersSelect = e.select(
  e.Player,
  (player) => ({
    ...e.Player["*"],
    order_by: player.rank,
  }),
)

export type PlayersSelect = $infer<typeof playersSelect>

export type PlayerSelect = PlayersSelect[0]
