
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { FormDataType } from "@/lib/types"
import type { SetFormDataType } from "@/lib/types"


export function OrganistsField({
  formData,
  setFormData,
}: {
  formData: FormDataType
  setFormData: SetFormDataType
}) {
  return (
    <div className="pt-4 border-t border-border">
              <div className="space-y-2">
                <Label htmlFor="organistas" className="text-sm font-medium">
                  Organistas
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full shrink-0 bg-transparent"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        organistas: Math.max(0, formData.organistas - 1),
                      })
                    }
                    disabled={formData.organistas === 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="organistas"
                    type="number"
                    min="0"
                    value={formData.organistas}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        organistas: Math.max(0, Number.parseInt(e.target.value) || 0),
                      })
                    }
                    className="h-10 text-center text-base font-semibold"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full shrink-0 bg-transparent"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        organistas: formData.organistas + 1,
                      })
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
  )
}