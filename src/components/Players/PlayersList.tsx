"use client"

import { useState } from "react"

import { Loading } from "@types"

import { Button } from "@shad"

import { exampleTopGamesList } from "./example_top_games_list"

export function PlayersList() {
  const [loading, setLoading] = useState(Loading.NotYet)

  return (
    <Button
      disabled={loading === Loading.Loading}
      onClick={async () => {
        setLoading(Loading.Loading)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // await postGames(transformedGames)
        setLoading(Loading.Loaded)
      }}
    >
      Register Games
    </Button>
  )
}
