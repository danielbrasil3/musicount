"use client"

import { useOnlineStatus } from "./useOnlineStatus"
import { useCallback, useState } from "react"

/**
 * Hook para gerenciar geração de PDF offline
 * Verifica se é possível gerar PDF e trata erros
 */
export function usePDFOffline() {
  const isOnline = useOnlineStatus()
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generatePDF = useCallback(async (
    generateFn: () => Promise<Blob | null>
  ): Promise<Blob | null> => {
    setIsGenerating(true)
    setError(null)

    try {
      const blob = await generateFn()
      
      if (!blob) {
        throw new Error("Erro ao gerar PDF")
      }

      return blob
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido ao gerar PDF"
      
      if (!isOnline && message.includes("Erro ao carregar imagem")) {
        setError("Algumas imagens não estão disponíveis offline. A geração de PDF pode estar incompleta.")
      } else {
        setError(message)
      }
      
      console.error("Erro ao gerar PDF:", err)
      return null
    } finally {
      setIsGenerating(false)
    }
  }, [isOnline])

  return {
    generatePDF,
    isGenerating,
    error,
    isOnline,
  }
}
