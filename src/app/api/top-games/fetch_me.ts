import { type Fox_PlayerInfo } from "@types"

import { API, headers } from "./fetch_top_games"

/**
 * This is so far only being used for triggering a login on
 * the API.
 */
export async function fetchMe() {
  const res = await fetch(`${API}/me`, { headers })
  return (await res.json()) as Fox_PlayerInfo
}
