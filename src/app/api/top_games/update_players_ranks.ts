import _ from "lodash"

import {
  type Fox_GamePlayer,
  type Fox_Game,
  type PlayerSelect,
  type PlayerUpsert,
} from "@types"

import { edgeDbClient } from "@db"

import {
  playersSelectFromIds,
  playersUpsert,
} from "@queries"

function evalStreak(
  wins: number,
  losses: number,
  rank: number,
) {
  if (wins >= 18) return rank + 200
  else if (wins >= 14) return rank + 100
  else if (losses <= 18) return rank - 200
  else if (losses <= 14) return rank - 100
  else return rank
}

export async function updatePlayersRanks(
  topGames: Fox_Game[],
) {
  // 1. Players from API
  const blackPlayers = topGames.map((g) => g.black)
  const whitePlayers = topGames.map((g) => g.white)
  const playersFromAPI = _.uniqBy(
    blackPlayers.concat(whitePlayers),
    "id",
  )
  const playersFromAPIHashTable: Record<
    number,
    Fox_GamePlayer
  > = {}
  for (const p of playersFromAPI) {
    playersFromAPIHashTable[p.id] = p
  }

  // 1.1. Players Ids from API
  const blackPlayersIds = blackPlayers.map((p) => p.id)
  const whitePlayersIds = whitePlayers.map((p) => p.id)
  const playersIds = new Set(
    blackPlayersIds.concat(whitePlayersIds),
  )

  // 2. Fetch the players from DB
  const playersFromDb = await playersSelectFromIds.run(
    edgeDbClient,
    { ids: [...playersIds] },
  )
  // 2.1. Convert it to a hash table
  const playersFromDbHashTable: Record<
    number,
    PlayerSelect
  > = {}
  for (const p of playersFromDb) {
    playersFromDbHashTable[p.fox_id] = p
  }

  // 3. Order Top Games by Date
  const orderedTopGames = _.orderBy(
    topGames,
    ["start_time"],
    ["asc"],
  )

  // 4. Go Through Each Game and Update the Players Streak
  const updatedPlayers: Record<number, PlayerUpsert> = {}
  for (const g of orderedTopGames) {
    const black = g.black
    const white = g.white

    // 4.1. Either from DB or what we've already updated
    const blackFromDb =
      updatedPlayers[black.id] ??
      playersFromDbHashTable[black.id]
    const whiteFromDb =
      updatedPlayers[white.id] ??
      playersFromDbHashTable[white.id]

    // 4.2. If the difference between the players' ranks is
    //      bigger than 2, we don't count it for ranking.
    //      Otherwise, players will be able to rank up
    //      indefinitely.
    let blackRank = Math.max(
      blackFromDb?.rank ?? 2900,
      2900,
    )
    let whiteRank = Math.max(
      whiteFromDb?.rank ?? 2900,
      2900,
    )
    const rankDiff = Math.abs(blackRank - whiteRank)
    if (rankDiff >= 200) continue

    let blackWins = blackFromDb?.windowed_wins ?? 0
    let blackLosses = blackFromDb?.windowed_losses ?? 0
    let whiteWins = whiteFromDb?.windowed_wins ?? 0
    let whiteLosses = whiteFromDb?.windowed_losses ?? 0

    // 4.3. Update wins and losses from this game
    if (g.result.winner === "BLACK") {
      blackWins++
      whiteLosses++
    } else if (g.result.winner === "WHITE") {
      blackLosses++
      whiteWins++
    }

    // 4.4. Re-evaluate the rankings
    if (blackWins + blackLosses === 20) {
      blackRank = evalStreak(
        blackWins,
        blackLosses,
        blackRank,
      )
      blackWins = 0
      blackLosses = 0
    }
    if (whiteWins + whiteLosses === 20) {
      whiteRank = evalStreak(
        whiteWins,
        whiteLosses,
        whiteRank,
      )
      whiteWins = 0
      whiteLosses = 0
    }

    // 4.5. Format the new data
    const newBlack: PlayerUpsert = {
      fox_id: black.id,
      nick: black.nick,
      name: black.name,
      ai: black.ai,
      country: black.country,
      rank: blackRank,
      windowed_wins: blackWins,
      windowed_losses: blackLosses,
    }
    const newWhite: PlayerUpsert = {
      fox_id: white.id,
      nick: white.nick,
      name: white.name,
      ai: white.ai,
      country: white.country,
      rank: whiteRank,
      windowed_wins: whiteWins,
      windowed_losses: whiteLosses,
    }

    updatedPlayers[newBlack.fox_id] = newBlack
    updatedPlayers[newWhite.fox_id] = newWhite
  }

  // 5. Upsert to DB
  await playersUpsert.run(edgeDbClient, {
    players: Object.values(updatedPlayers),
  })

  return updatedPlayers
}
