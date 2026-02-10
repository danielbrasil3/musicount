"use client"

import { AlertCircle, Wifi, WifiOff } from "lucide-react"
import { useOnlineStatus } from "@/hooks/useOnlineStatus"
import { Alert, AlertDescription } from "@/components/ui/alert"

/**
 * Componente que avisa sobre limitações de geração de PDF offline
 */
export function PDFOfflineWarning() {
  const isOnline = useOnlineStatus()

  if (isOnline) return null

  return (
    <Alert className="mb-4 border-yellow-700 bg-yellow-900/20">
      <AlertCircle className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="text-yellow-700">
        Você está offline. O PDF será gerado, mas a imagem de fundo pode não aparecer se ainda não foi carregada.
      </AlertDescription>
    </Alert>
  )
}
