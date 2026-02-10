"use client"

import { useEffect, useState } from "react"

/**
 * Hook para detectar status de conexão do usuário
 * Retorna true se online, false se offline
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Definir estado inicial
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine)
    }

    // Event listeners
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return isOnline
}
