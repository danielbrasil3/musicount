{/* UI COMPONENTS */}
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { memo } from "react"

{/* ICONS */}
import { MapPin, Plus } from "lucide-react"

{/* CONSTANTS */}
import { MAX_LOCALIDADE_LENGTH } from "@/lib/validation"

{/* HOOKS */}
import { useFormFields } from "@/hooks/useFormFields"

{/* TYPES */}
import type { SetGeneralInfo } from "@/lib/types"



interface LocationFieldProps {
  currentStep: number
  localidade: string
  setFormData: SetGeneralInfo
  onReset: () => void
}

export const LocationField = memo(function LocationField({
  currentStep,
  localidade,
  setFormData,
  onReset,
}: LocationFieldProps) {
  const { createInputChangeHandler } = useFormFields(setFormData)

  return (
    <Card
        className={`${
          currentStep >= 0 ? "opacity-100" : "opacity-0 pointer-events-none absolute"
        }`}
      >
        <CardContent>
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">Localidade</h2>
            </div>
            <Button
              type="reset"
              onClick={onReset}
              variant="outline"
              className="flex-1 max-w-38 border-blue-700 text-blue-400 hover:bg-blue-800"
            >
              <Plus className="w-4 h-4 mr-1" />
              Novo Relatório
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="localidade" className="text-sm font-medium">
              Nome da Localidade <span className="text-red-500">*</span>
            </Label>
            <Input
              id="localidade"
              placeholder="Digite o nome da localidade"
              value={localidade}
              onChange={createInputChangeHandler("localidade")}
              maxLength={MAX_LOCALIDADE_LENGTH}
              className="h-12 text-base"
              autoFocus
            />
          </div>
        </CardContent>
      </Card>
  )
})