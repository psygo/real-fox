"use client"

import { Button } from "@shad"

export function FetchButton() {
  return (
    <Button
      onClick={async () => {
        await fetch("/api/top_games", { method: "POST" })
      }}
    >
      Fetch and Update DB
    </Button>
  )
}
