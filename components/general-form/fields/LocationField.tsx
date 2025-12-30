{/* UI COMPONENTS */}
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

{/* ICONS */}
import { MapPin, Plus } from "lucide-react"

{/* CONSTANTS */}
import { MAX_LOCALIDADE_LENGTH } from "@/lib/validation"

{/* HOOKS */}
import { useFormFields } from "@/hooks/useFormFields"

{/* TYPES */}
import type { FormDataType, SetFormDataType } from "@/lib/types"



interface LocationFieldProps {
  currentStep: number
  formData: FormDataType
  setFormData: SetFormDataType
  onReset: () => void
}

export function LocationField({
  currentStep,
  formData,
  setFormData,
  onReset,
}: LocationFieldProps) {
  const { createInputChangeHandler } = useFormFields(setFormData)

  return (
    <Card
        className={`transition-all duration-700 ${
          currentStep >= 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none absolute"
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
              value={formData.localidade}
              onChange={createInputChangeHandler("localidade")}
              maxLength={MAX_LOCALIDADE_LENGTH}
              className="h-12 text-base"
              autoFocus
            />
          </div>
        </CardContent>
      </Card>
  )}