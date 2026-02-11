"use client"

import { useInstallPrompt } from "@/hooks/useInstallPrompt"
import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

/**
 * Botão para instalar o PWA manualmente
 * Só aparece quando o beforeinstallprompt está disponível
 * Renderiza como um banner no topo da página
 */
export function InstallPWAButton() {
  const { canInstall, installApp } = useInstallPrompt()
  const [dismissed, setDismissed] = useState(false)

  if (!canInstall || dismissed) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-primary/90 to-primary/80 backdrop-blur-sm text-primary-foreground px-4 py-3 flex items-center justify-between gap-4 shadow-lg border-b border-primary/20">
      <div className="flex items-center gap-3 flex-1">
        <Download className="w-5 h-5 shrink-0" />
        <div>
          <p className="text-sm font-medium">Instale o MusiCount</p>
          <p className="text-xs opacity-90">Acesso rápido e modo offline</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 shrink-0">
        <Button
          onClick={installApp}
          variant="secondary"
          size="sm"
          className="font-medium"
        >
          Instalar
        </Button>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          aria-label="Descartar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

