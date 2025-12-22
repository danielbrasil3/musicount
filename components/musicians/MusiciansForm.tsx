"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Music2} from "lucide-react"
import type { FormDataType, SetFormDataType } from "@/lib/types"
import { instruments } from "@/lib/constants"
import { useMemo } from "react"
import { InstrumentsField } from "./fields/InstrumentsField"
import { OrganistsField } from "./fields/OrganistsField"

export default function MusiciansField({
  formData,
  setFormData,
}: {
  formData: FormDataType
  setFormData: SetFormDataType
}) {
  const updateInstrument = (id: string, value: number) => {
    setFormData({
      ...formData,
      instrumentos: {
        ...formData.instrumentos,
        [id]: Math.max(0, value),
      },
    })
  }

  const increment = (id: string) => {
    const current = formData.instrumentos[id] || 0
    updateInstrument(id, current + 1)
  }

  const decrement = (id: string) => {
    const current = formData.instrumentos[id] || 0
    updateInstrument(id, current - 1)
  }

  const totalMusicians = useMemo(() => {
    return Object.values(formData.instrumentos).reduce((sum, count) => sum + count, 0)
  }, [formData.instrumentos])

  const totalGeral = useMemo(() => {
    return totalMusicians + formData.organistas
  }, [totalMusicians, formData.organistas])

  const groupedInstruments = useMemo(() => {
    const groups: { [key: string]: typeof instruments } = {}
    instruments.forEach((instrument) => {
      if (!groups[instrument.category]) {
        groups[instrument.category] = []
      }
      groups[instrument.category].push(instrument)
    })
    return groups
  }, [])


  return (
    <div className="space-y-4">
      <Card className="transition-all duration-700 animate-in fade-in slide-in-from-bottom-8">
        <CardContent>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Music2 className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">Músicos</h2>
          </div>

          <div className="space-y-6">
            {Object.entries(groupedInstruments).map(([category, categoryInstruments]) => (
              <InstrumentsField
                key={category}
                formData={formData}
                category={category}
                categoryInstruments={categoryInstruments}
                increment={increment}
                decrement={decrement}
              />
            ))}

            <OrganistsField formData={formData} setFormData={setFormData} />
          </div>
        </CardContent>
      </Card>

      <Card className="transition-all duration-700 animate-in fade-in slide-in-from-bottom-8 delay-150 bg-primary/5 border-primary/20">
        <CardContent>
          <h3 className="text-base font-semibold mb-4">Conferência</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
              <span className="text-sm text-muted-foreground">Total de Músicos</span>
              <span className="text-lg font-bold text-foreground">{totalMusicians}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
              <span className="text-sm text-muted-foreground">Total de Organistas</span>
              <span className="text-lg font-bold text-foreground">{formData.organistas}</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-base font-semibold text-foreground">Total Geral</span>
              <span className="text-2xl font-bold text-primary">{totalGeral}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
