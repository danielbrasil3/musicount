"use client"

import { useOnlineStatus } from "@/hooks/useOnlineStatus"
import { AlertCircle, Wifi } from "lucide-react"

/**
 * Componente que mostra notificação quando o usuário fica offline ou volta online
 */
export function OfflineIndicator() {
  const isOnline = useOnlineStatus()

  if (isOnline) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-900 text-yellow-50 px-4 py-3 flex items-center gap-3 shadow-lg rounded-b-lg">
      <AlertCircle className="w-5 h-5 shrink-0" />
      <div className="flex-1 text-sm font-medium">
        Você está offline. Os dados serão sincronizados quando voltar à conexão.
      </div>
    </div>
  )
}
