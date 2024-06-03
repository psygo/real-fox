import { GeistSans } from "geist/font/sans"

import { type WithReactChildren } from "@types"

import "@styles/globals.css"

export const metadata = {
  title: "Real Fox",
  description: "Ranking Fox Weiqi players beyond 9d",
}

export default function RootLayout({
  children,
}: WithReactChildren) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
