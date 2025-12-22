
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Users } from "lucide-react"
import type { FormDataType } from "@/lib/types"
import type { SetFormDataType } from "@/lib/types"


export function AttendanceField({ formData, setFormData }: {
  formData: FormDataType
  setFormData: SetFormDataType
}) {
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
                        <Label htmlFor="localidade" className="text-sm font-medium">
                            Presidência
                        </Label>
                        <Input
                            id="presidencia"
                            placeholder="Digite o nome do irmão da presidência"
                            value={formData.atendimentoPresidencia}
                            onChange={(e) => setFormData({ ...formData, atendimentoPresidencia: e.target.value })}
                            className="h-12 text-base"
                            autoFocus
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="localidade" className="text-sm font-medium">
                            Regência
                        </Label>
                        <Input
                            id="regencia"
                            placeholder="Digite o nome do irmão na regência"
                            value={formData.atendimentoRegencia}
                            onChange={(e) => setFormData({ ...formData, atendimentoRegencia: e.target.value })}
                            className="h-12 text-base"
                            autoFocus
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
  )
}