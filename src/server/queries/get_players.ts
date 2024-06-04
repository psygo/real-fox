import e from "@schema"

export const playersSelect = e.select(
  e.Player,
  (player) => ({
    ...e.Player["*"],
    order_by: player.rank,
  }),
)

export const playersSelectFromIds = e.params(
  { ids: e.array(e.bigint) },
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
