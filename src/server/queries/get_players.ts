import e from "@schema"

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
