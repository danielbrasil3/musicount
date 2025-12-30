"use client"

{/* UI COMPONENTS */}
import { Card, CardContent } from "@/components/ui/card"

{/* ICONS */}
import { Music2 } from "lucide-react"

{/* TYPES */}
import type { FormDataType, SetFormDataType } from "@/lib/types"

{/* FIELDS */}
import { InstrumentsField } from "./fields/InstrumentsField"
import { OrganistsField } from "./fields/OrganistsField"

{/* HOOKS */}
import { useOrganistCount } from "@/hooks/useOrganistCount"
import { useInstrumentCount } from "@/hooks/useInstrumentCount"
import { useTotalsCount } from "@/hooks/useTotalsCount"

interface MusiciansFieldProps {
  formData: FormDataType
  setFormData: SetFormDataType
}

export default function MusiciansField({ formData, setFormData }: MusiciansFieldProps) {
  const totalsCount = useTotalsCount(formData)
  const instrumentCount = useInstrumentCount(formData, setFormData)
  const organistCount = useOrganistCount(formData, setFormData)


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
            {Object.entries(instrumentCount.groupedInstruments).map(([category, categoryInstruments]) => (
              <InstrumentsField
                key={category}
                formData={formData}
                category={category}
                categoryInstruments={categoryInstruments}
                increment={instrumentCount.increment}
                decrement={instrumentCount.decrement}
                updateInstrument={instrumentCount.updateInstrument}
              />
            ))}

            <OrganistsField
              organistas={organistCount.organistas}
              increment={organistCount.increment}
              decrement={organistCount.decrement}
              updateOrganistas={organistCount.updateOrganistas}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="transition-all duration-700 animate-in fade-in slide-in-from-bottom-8 delay-150 bg-primary/5 border-primary/20">
        <CardContent>
          <h3 className="text-base font-semibold mb-4">Conferência</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
              <span className="text-sm text-muted-foreground">Total de Músicos</span>
              <span className="text-lg font-bold text-foreground">{totalsCount.totalMusicos}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
              <span className="text-sm text-muted-foreground">Total de Organistas</span>
              <span className="text-lg font-bold text-foreground">{formData.organistas}</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-base font-semibold text-foreground">Total Geral</span>
              <span className="text-2xl font-bold text-primary">{totalsCount.totalOrquestra}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
