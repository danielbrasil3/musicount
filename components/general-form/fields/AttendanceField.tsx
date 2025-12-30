{/* UI COMPONENTS */}
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

{/* ICONS */}
import { Users } from "lucide-react"

{/* CONSTANTS */}
import { MAX_NAME_LENGTH } from "@/lib/validation"

{/* HOOKS */}
import { useFormFields } from "@/hooks/useFormFields"

{/* TYPES */}
import type { FormDataType, SetFormDataType } from "@/lib/types"

interface AttendanceFieldProps {
  formData: FormDataType
  setFormData: SetFormDataType
}

export function AttendanceField({ setFormData, formData }: AttendanceFieldProps) {
  const { createInputChangeHandler } = useFormFields(setFormData)
  return (
    <Card className="transition-all duration-700 animate-in fade-in slide-in-from-bottom-8">
            <CardContent>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <Users className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold">Atendimento</h2>
                </div>
                <div className="space-y-3">
                    <div className="space-y-2">
                        <Label htmlFor="presidencia" className="text-sm font-medium">
                            Presidência
                        </Label>
                        <Input
                            id="presidencia"
                            placeholder="Digite o nome do irmão da presidência"
                            value={formData.atendimentoPresidencia}
                            onChange={createInputChangeHandler("atendimentoPresidencia")}
                            maxLength={MAX_NAME_LENGTH}
                            className="h-12 text-base"
                            autoFocus
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="regencia" className="text-sm font-medium">
                            Regência
                        </Label>
                        <Input
                            id="regencia"
                            placeholder="Digite o nome do irmão na regência"
                            value={formData.atendimentoRegencia}
                            onChange={createInputChangeHandler("atendimentoRegencia")}
                            maxLength={MAX_NAME_LENGTH}
                            className="h-12 text-base"
                            autoFocus
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
  )
}