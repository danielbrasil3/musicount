import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { RegisterServiceWorker } from "@/components/pwa/RegisterServiceWorker"
import { OfflineIndicator } from "@/components/pwa/OfflineIndicator"
import { Inter } from "next/font/google"

export const metadata: Metadata = {
  title: "Controle de Ensaios Musicais",
  description: "Sistema de contagem e controle de presença em ensaios musicais",
  generator: "v0.app",
}

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // opcional, mas top
  weight: ["400", "500", "600", "700"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`dark ${inter.variable}`}>
      <head>

      </head>
      <body>
        <RegisterServiceWorker />
        <OfflineIndicator />
        {children}
      </body>
    </html>
  )
}

