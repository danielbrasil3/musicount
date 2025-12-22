import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { MapPin} from "lucide-react"
import type { FormDataType } from "@/lib/types"
import type { SetFormDataType } from "@/lib/types"





export function LocationField({
  formData,
  setFormData,
  currentStep,
}: {
  formData: FormDataType
  setFormData: SetFormDataType
  currentStep: number
}) {
  return (
    <Card
        className={`transition-all duration-700 ${
          currentStep >= 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none absolute"
        }`}
      >
        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">Localidade</h2>
          </div>
          <div className="space-y-2">
            <Label htmlFor="localidade" className="text-sm font-medium">
              Nome da Localidade <span className="text-red-500">*</span>
            </Label>
            <Input
              id="localidade"
              placeholder="Digite o nome da localidade"
              value={formData.localidade}
              onChange={(e) => setFormData({ ...formData, localidade: e.target.value })}
              className="h-12 text-base"
              autoFocus
            />
          </div>
        </CardContent>
      </Card>
  )}