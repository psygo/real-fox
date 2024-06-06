"use client"

import { Button } from "@shad"

type FetchButtonProps = {
  apiPath?: string
  method?: string
  text: string
}

export function FetchButton({
  apiPath = "/me",
  method = "GET",
  text,
}: FetchButtonProps) {
  return (
    <Button
      onClick={async () => {
        await fetch(`/api${apiPath}`, { method })
      }}
    >
      {text}
    </Button>
  )
}
