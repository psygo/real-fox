import _ from "lodash"

import { edgeDbClient } from "@db"

import {
  type PlayerUpsert,
  playersUpsert,
  playersSelectFromIds,
} from "@queries"

// import { PlayersList } from "@components"

import {
  type Fox_GamePlayer,
  type PlayerSelect,
} from "@types"

import { exampleTopGamesList } from "../api/top_games/example_top_games_list"

export function evalStreak(
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

export default async function HomePage() {
  // const players = await playersSelect.run(edgeDbClient)
  // 1. Fetch Top Games
  const topGames = exampleTopGamesList

  // 2. Players from API
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

  // 2.1. Players Ids from API
  const blackPlayersIds = blackPlayers.map((p) => p.id)
  const whitePlayersIds = whitePlayers.map((p) => p.id)
  const playersIds = new Set(
    blackPlayersIds.concat(whitePlayersIds),
  )

  // 3. Fetch the players from DB
  const playersFromDb = await playersSelectFromIds.run(
    edgeDbClient,
    { ids: [...playersIds] },
  )
  // 3.1. Convert it to hash table
  const playersFromDbHashTable: Record<
    number,
    PlayerSelect
  > = {}
  for (const p of playersFromDb) {
    playersFromDbHashTable[p.fox_id] = p
  }

  // 4. Order Top Games by date
  const orderedTopGames = _.orderBy(
    topGames,
    ["start_time"],
    ["asc"],
  )

  // 5. Go Through Each Game and Update the Players Streak
  const updatedPlayers: Record<number, PlayerUpsert> = {}
  for (const g of orderedTopGames) {
    const black = g.black
    const white = g.white

    const blackFromDb =
      updatedPlayers[black.id] ?? playersFromDb[black.id]
    const whiteFromDb =
      updatedPlayers[white.id] ?? playersFromDb[white.id]

    let blackWins = blackFromDb?.windowed_wins ?? 0
    let blackLosses = blackFromDb?.windowed_losses ?? 0
    let whiteWins = whiteFromDb?.windowed_wins ?? 0
    let whiteLosses = whiteFromDb?.windowed_losses ?? 0

    if (g.result.winner === "BLACK") {
      blackWins++
      whiteLosses++
    } else if (g.result.winner === "WHITE") {
      blackLosses++
      whiteWins++
    }

    let blackRank = blackFromDb?.rank ?? 2900
    if (blackWins + blackLosses === 20) {
      blackRank = evalStreak(
        blackWins,
        blackLosses,
        blackRank,
      )
      blackWins = 0
      blackLosses = 0
    }
    let whiteRank = whiteFromDb?.rank ?? 2900
    if (whiteWins + whiteLosses === 20) {
      whiteRank = evalStreak(
        whiteWins,
        whiteLosses,
        whiteRank,
      )
      whiteWins = 0
      whiteLosses = 0
    }

    const newBlack: PlayerUpsert = {
      fox_id: black.id,
      rank: blackRank,
      windowed_wins: blackWins,
      windowed_losses: blackLosses,
    }
    const newWhite: PlayerUpsert = {
      fox_id: white.id,
      rank: whiteRank,
      windowed_wins: whiteWins,
      windowed_losses: whiteLosses,
    }

    updatedPlayers[newBlack.fox_id] = newBlack
    updatedPlayers[newWhite.fox_id] = newWhite
  }

  console.log("updated players", updatedPlayers)

  await playersUpsert.run(edgeDbClient, {
    players: Object.values(updatedPlayers),
  })

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-gray-400">Fox Top Players</h2>
      {/* <PlayersList players={players} /> */}
    </div>
  )
}
