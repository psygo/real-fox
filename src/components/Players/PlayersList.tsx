"use client"

import { useState } from "react"

import { Loading } from "@types"

import { postGames } from "@actions"

import { Button } from "@shad"

export function PlayersList() {
  const [loading, setLoading] = useState(Loading.NotYet)

  return (
    <Button
      disabled={loading === Loading.Loading}
      onClick={async () => {
        setLoading(Loading.Loading)
        console.log("here")
        await postGames()
        setLoading(Loading.Loaded)
      }}
    >
      Register Games
    </Button>
  )
}
