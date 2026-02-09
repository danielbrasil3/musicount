"use client"

{/* UI COMPONENTS */}
import { Card, CardContent} from "@/components/ui/card"

{/* FIELDS */}
import { IrmandadeField } from "./fields/irmandadeField"
import { MinisterioField } from "./fields/ministerioField"

{/* HOOKS */}
import { useMinisterioCount } from "@/hooks/useMinisterioCount"
import { useIrmandadeCount } from "@/hooks/useIrmandadeCount"
import { usePersistedForm } from "@/hooks/usePersistedForm"

{/* CONSTANTS */}
import { INITIAL_COMPARECIMENTO } from "@/lib/constants"

export default function ComparecimentoForm() {
  const {formData, setFormData, resetForm} = usePersistedForm("comparecimento", INITIAL_COMPARECIMENTO)
  const ministerioCount = useMinisterioCount(formData, setFormData)
  const irmandadeCount = useIrmandadeCount(formData, setFormData)

  // Calcular totais apenas para este formulário
  const totalMinisterio = Object.values(formData.ministerio).reduce((sum, v) => sum + v, 0)
  const totalIrmandade = formData.irmandade.irmas + formData.irmandade.irmaos
  const totalNaoOrquestra = totalMinisterio + totalIrmandade

  return (
    <div className="space-y-6">
      {/* Ministério Card */}
      <MinisterioField 
        ministerio={ministerioCount.ministerio}
        increment={ministerioCount.increment} 
        decrement={ministerioCount.decrement} 
        updateMinisterio={ministerioCount.setMinisterio} />


      {/* Irmandade Card */}
      <IrmandadeField 
        formData={formData}
        increment={irmandadeCount.increment} 
        decrement={irmandadeCount.decrement} 
        setIrmandadeCount={irmandadeCount.setIrmandadeCount} />
      {/* Total Card */}
      <Card className="border-primary/30 bg-primary/5 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Ministério:</span>
              <span className="font-semibold">{totalMinisterio}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Irmandade:</span>
              <span className="font-semibold">{totalIrmandade}</span>
            </div>
            <div className="flex justify-between text-lg pt-2 border-t border-border/30">
              <span className="font-semibold">Total geral:</span>
              <span className="font-bold text-primary">{totalNaoOrquestra}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
