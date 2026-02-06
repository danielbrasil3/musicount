import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { RegisterServiceWorker } from "@/components/pwa/RegisterServiceWorker"

export const metadata: Metadata = {
  title: "Controle de Ensaios Musicais",
  description: "Sistema de contagem e controle de presença em ensaios musicais",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="font-sans antialiased">
        <RegisterServiceWorker />
        {children}
      </body>
    </html>
  )
}
