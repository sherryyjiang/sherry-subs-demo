import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Instrument_Sans, Hedvig_Letters_Serif } from 'next/font/google'

// Define the fonts
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--font-instrument-sans',
})

const hedvigLettersSerif = Hedvig_Letters_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hedvig-letters',
})

export const metadata: Metadata = {
  title: "Tax Chat",
  description: "Personal finance assistant",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${hedvigLettersSerif.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>{children}</body>
    </html>
  )
}

