import { type NextRequest } from "next/server"

export function cronAuth(req: NextRequest) {
  return (
    process.env.NODE_ENV === "production" &&
    req.headers.get("Authorization") !==
      `Bearer ${process.env.CRON_SECRET}`
  )
}
