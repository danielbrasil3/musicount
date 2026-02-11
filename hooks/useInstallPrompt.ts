import { useEffect, useState, useCallback } from "react"

/**
 * Hook que gerencia o evento beforeinstallprompt do PWA
 * Permite disparar a prompt de instalação manualmente
 */
export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [canInstall, setCanInstall] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Detecta se o app já está instalado
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
      return
    }

    // Handler para o evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      // Previne o navegador mostrar o mini-infobar automaticamente
      e.preventDefault()
      // Armazena o evento para uso posterior
      setDeferredPrompt(e)
      // Mostra o botão de instalação
      setCanInstall(true)
    }

    // Detecta se a instalação foi concluída
    const handleAppInstalled = () => {
      console.log("PWA instalado com sucesso")
      setDeferredPrompt(null)
      setCanInstall(false)
      setIsInstalled(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  // Função para disparar a prompt de instalação
  const installApp = useCallback(async () => {
    if (!deferredPrompt) {
      console.log("Prompt de instalação não está disponível")
      return
    }

    // Dispara a prompt de instalação
    const promptEvent = deferredPrompt as any
    promptEvent.prompt()

    // Aguarda a resposta do usuário
    const { outcome } = await promptEvent.userChoice
    console.log(`Usuário respondeu com: ${outcome}`)

    // Limpa o state
    setDeferredPrompt(null)
    setCanInstall(false)
  }, [deferredPrompt])

  return {
    canInstall,
    isInstalled,
    installApp,
  }
}
