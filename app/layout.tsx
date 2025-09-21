import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-context"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

export const metadata: Metadata = {
  title: "NUTPAM 2025 - Hackathon & Workshop",
  description:
    "Join NUTPAM 2025 - A one-day workshop and hackathon event featuring NoCodeML and innovative problem-solving",
  generator: "v0.app",
  keywords: ["hackathon", "workshop", "NoCodeML", "NUTPAM", "2025", "coding", "innovation"],
  authors: [{ name: "NUTPAM Team" }],
  openGraph: {
    title: "NUTPAM 2025 - Hackathon & Workshop",
    description: "Join NUTPAM 2025 - A one-day workshop and hackathon event",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${orbitron.variable} antialiased`}>
        <ThemeProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
