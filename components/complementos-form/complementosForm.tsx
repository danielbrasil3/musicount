"use client"

{/* UI COMPONENTS */}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

{/* ICONS */}
import { Music } from "lucide-react"

{/* FIELDS */}
import { HinosField } from "./fields/hinosField"
import { CoroField } from "./fields/coroField"
import { VisitasField } from "./fields/visitasField"

{/* HOOKS */}
import { useComplements } from "@/hooks/useComplements"

{/* TYPES */}
import type { FormDataType, SetFormDataType } from "@/lib/types"

type ComplementosFormProps = {
  formData: FormDataType
  setFormData: SetFormDataType
}

export default function ComplementosForm({ formData, setFormData }: ComplementosFormProps) {
  const { hinos, coros, visitas, addItem, removeItem } = useComplements(formData, setFormData)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Music className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-xl">Complementos</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Hinos */}
          <HinosField onAdd={(v) => addItem("hinos", v)} onRemove={(i) => removeItem("hinos", i)} items={hinos} />

          {/* Coros */}
          <CoroField onAdd={(v) => addItem("coros", v)} onRemove={(i) => removeItem("coros", i)} items={coros} />

          {/* Visitas */}
          <VisitasField onAdd={(v) => addItem("visitas", v)} onRemove={(i) => removeItem("visitas", i)} items={visitas} />
        </CardContent>
      </Card>

      {/* Card de Conferência */}
      <Card className="border-border/50 bg-primary/5 backdrop-blur-sm shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Resumo dos Complementos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Hinos</p>
              <p className="font-semibold">{hinos.length} hino(s)</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Coros</p>
              <p className="font-semibold">{coros.length} coro(s)</p>
            </div>
            <div className="space-y-1 col-span-2">
              <p className="text-muted-foreground">Visitas</p>
              <p className="font-semibold">{visitas.length} local(is)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
