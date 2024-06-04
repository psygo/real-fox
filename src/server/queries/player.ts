import e, { type $infer } from "@schema"

export const playerQuery = e.select(e.Player, () => ({
  ...e.Player["*"],
}))

export type PlayerSelect = $infer<typeof playerQuery>
