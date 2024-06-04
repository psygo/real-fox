import e from "@schema"

export const playersSelect = e.select(
  e.Player,
  (player) => ({
    ...e.Player["*"],
    order_by: player.rank,
  }),
)
