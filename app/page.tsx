import { GeralForm } from "@/components/general-form/GeneralForm"
import { Music } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <Music className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Controle de Ensaios</h1>
              <p className="text-sm text-muted-foreground">Registre as informações do ensaio musical</p>
            </div>
          </div>
        </div>
          <GeralForm />
      </div>
    </main>
  )
}
