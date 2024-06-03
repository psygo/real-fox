"use client"

import { useState } from "react"

import { Loading } from "@types"

import { Button } from "@shad"

export function PlayersList() {
  const [loading, setLoading] = useState(Loading.NotYet)

  return (
    <Button
      disabled={loading === Loading.Loading}
      onClick={() => {
        setLoading(Loading.Loading)
        console.log("here")
        setLoading(Loading.Loaded)
      }}
    >
      Register Games
    </Button>
  )
}
