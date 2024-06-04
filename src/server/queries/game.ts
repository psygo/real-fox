import e, { type $infer } from "@schema"

export const gameSelectQuery = e.select(e.Game, () => ({
  ...e.Game["*"],
  black: {
    ...e.Player["*"],
  },
  white: {
    ...e.Player["*"],
  },
}))

export type GameSelect = $infer<typeof gameSelectQuery>
