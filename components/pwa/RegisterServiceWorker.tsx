"use client"

import { useEffect } from "react"

export function RegisterServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return

    const registerServiceWorker = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js")
      } catch (error) {
        console.error("Falha ao registrar service worker", error)
      }
    }

    void registerServiceWorker()
  }, [])

  return null
}
