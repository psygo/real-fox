import "@/styles/globals.css"

import { GeistSans } from "geist/font/sans"

export const metadata = {
  title: "Real Fox",
  description: "Ranking Fox Weiqi players beyond 9d.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
