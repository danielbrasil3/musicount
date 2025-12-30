"use client"

{/* UI COMPONENTS */}
import { Card, CardContent} from "@/components/ui/card"

{/* TYPES */}
import type { FormDataType, SetFormDataType } from "@/lib/types"

{/* FIELDS */}
import { IrmandadeField } from "./fields/irmandadeField"
import { MinisterioField } from "./fields/ministerioField"

{/* HOOKS */}
import { useMinisterioCount } from "@/hooks/useMinisterioCount"
import { useIrmandadeCount } from "@/hooks/useIrmandadeCount"
import { useTotalsCount } from "@/hooks/useTotalsCount"

interface ComparecimentoFormProps {
  formData: FormDataType
  setFormData: SetFormDataType
}

export default function ComparecimentoForm({ formData, setFormData }: ComparecimentoFormProps) {
  const totalsCount = useTotalsCount(formData)
  const ministerioCount = useMinisterioCount(formData, setFormData)
  const irmandadeCount = useIrmandadeCount(formData, setFormData)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
              <span className="font-semibold">{totalsCount.totalMinisterio}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Irmandade:</span>
              <span className="font-semibold">{totalsCount.totalIrmandade}</span>
            </div>
            <div className="flex justify-between text-lg pt-2 border-t border-border/30">
              <span className="font-semibold">Total geral:</span>
              <span className="font-bold text-primary">{totalsCount.totalNaoOrquestra}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
