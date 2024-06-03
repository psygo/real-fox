import { GeistSans } from "geist/font/sans"

import { type WithReactChildren } from "@types"

import { Footer, TopNav } from "@components"

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
      <body className="dark flex flex-col gap-6 antialiased">
        <TopNav />
        <main className="min-h-screen px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
