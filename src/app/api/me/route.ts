import { type NextRequest, NextResponse } from "next/server"

import { cronAuth } from "../cron_auth"

import { fetchMe } from "../top-games/fetch_me"

/**
 * Just so we can artificially trigger a login.
 */
export async function GET(req: NextRequest) {
  try {
    if (!cronAuth(req))
      return NextResponse.json({}, { status: 401 })

    const me = await fetchMe()

    console.log("Me", me)

    return NextResponse.json({}, { status: 201 })
  } catch (e) {
    console.error(e)
  }
}
