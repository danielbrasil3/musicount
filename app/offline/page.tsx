"use client"

import { useOnlineStatus } from "@/hooks/useOnlineStatus"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wifi } from "lucide-react"

export default function OfflinePage() {
  const isOnline = useOnlineStatus()
  const router = useRouter()

  // Se voltar online, redireciona para home
  useEffect(() => {
    if (isOnline) {
      // Aguarda um pouco para garantir que a rede está estável
      const timer = setTimeout(() => {
        router.push("/")
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isOnline, router])

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <section className="max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-lg bg-yellow-900/30 border border-yellow-700">
            <Wifi className="w-8 h-8 text-yellow-600" strokeWidth={1.5} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Você está offline</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sem conexão com a internet no momento. Você ainda pode continuar editando os dados do
          formulário; quando voltar a conexão, a página será recarregada automaticamente.
        </p>
        {!isOnline && (
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="mt-6"
          >
            Voltar para formulário
          </Button>
        )}
        {isOnline && (
          <div className="mt-6 text-sm text-green-600 flex items-center justify-center gap-2">
            <Wifi className="w-4 h-4" />
            Conexão restaurada
          </div>
        )}
      </section>
    </main>
  )
}

