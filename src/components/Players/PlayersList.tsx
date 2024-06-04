"use client"

import { useState } from "react"

import { Loading } from "@types"

import { postGames } from "@actions"

import { Button } from "@shad"

import { exampleTopGamesList } from "./example_top_games_list"

export function PlayersList() {
  const [loading, setLoading] = useState(Loading.NotYet)

  const transformedGames = exampleTopGamesList
    .slice(0, 15)
    .map((g) => {
      return {
        game_id: g.id,
        start_time: new Date(),
        end_time: new Date(),
        winner: g.result.winner,
        black: {
          fox_id: g.black.id,
          nick: g.black.nick,
          name: g.black.name,
          rank: 3000,
          country: g.black.country,
          ai: g.black.ai,
          updated_at: new Date(),
          created_at: new Date(),
        },
        white: {
          fox_id: g.white.id,
          nick: g.white.nick,
          name: g.white.name,
          rank: 3000,
          country: g.white.country,
          ai: g.white.ai,
          updated_at: new Date(),
          created_at: new Date(),
        },
      }
    })

  console.log(
    "game_ids",
    new Set(exampleTopGamesList.map((g) => g.id)),
  )
  console.log("example", exampleTopGamesList)
  console.log("transformed", transformedGames)

  return (
    <Button
      disabled={loading === Loading.Loading}
      onClick={async () => {
        setLoading(Loading.Loading)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await postGames(transformedGames)
        setLoading(Loading.Loaded)
      }}
    >
      Register Games
    </Button>
  )
}
