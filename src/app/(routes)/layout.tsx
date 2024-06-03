import { GeistSans } from "geist/font/sans"

import { type WithReactChildren } from "@types"

import { TopNav } from "@components"

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
      <body className="dark min-h-screen antialiased">
        <TopNav />
        <main className="p-4">{children}</main>
      </body>
    </html>
  )
}
