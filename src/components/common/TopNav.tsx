import Link from "next/link"

import { Button } from "@shad"

export function TopNav() {
  return (
    <nav className="flex w-screen justify-between bg-gray-700 px-3 py-3">
      <Link href="/">
        <Button variant="secondary" className="px-[12px]">
          <h1 className="text-2xl font-bold tracking-tight">
            Real Fox
          </h1>
        </Button>
      </Link>
      <Link href="/about">
        <Button variant="secondary" className="px-[12px]">
          <h2 className="text-xl font-semibold">About</h2>
        </Button>
      </Link>
    </nav>
  )
}
