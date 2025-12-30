
{/* UI COMPONENTS */}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

{/* ICONS */}
import { Plus, Minus, Users } from "lucide-react"

{/* HOOKS */}
import { useCallback} from "react"
import { validateNumber } from "@/lib/validation"
{/* TYPES */}
import type { FormDataType } from "@/lib/types"



interface IrmandadeFieldProps {
  formData: FormDataType
  increment: (fields: "irmas" | "irmaos") => void
  decrement: (fields: "irmas" | "irmaos") => void
  setIrmandadeCount: (field: "irmas" | "irmaos", value: number) => void
}

export function IrmandadeField({
  formData,
  increment,
  decrement,
  setIrmandadeCount,
}: IrmandadeFieldProps) {
  
  const irmasInput = formData.irmandade.irmas
  const irmaosInput = formData.irmandade.irmaos

  const handleIrmasChange = useCallback(
    (value: string) => {
      setIrmandadeCount("irmas", validateNumber(value, 0, 9999))
    },
    [setIrmandadeCount],
  )

  const handleIrmaosChange = useCallback(
    (value: string) => {
      setIrmandadeCount("irmaos", validateNumber(value, 0, 9999))
    },
    [setIrmandadeCount],
  )
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Users className="h-5 w-5" />
            Irmandade
          </CardTitle>
          <CardDescription>Registre a presença da irmandade</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30 hover:border-border/60 transition-all duration-200">
            <span className="text-sm font-medium">Irmãs</span>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-transparent"
                onClick={() => decrement("irmas")}
                disabled={irmasInput === 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="0"
                max="9999"
                value={irmasInput}
                onChange={(e) => handleIrmasChange(e.target.value)}
                className="w-16 h-8 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&]:appearance-none"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-transparent"
                onClick={() => increment("irmas")}
                disabled={irmasInput === 9999}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30 hover:border-border/60 transition-all duration-200">
            <span className="text-sm font-medium">Irmãos</span>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-transparent"
                onClick={() => decrement("irmaos")}
                disabled={irmaosInput === 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={irmaosInput}
                onChange={(e) => handleIrmaosChange(e.target.value)}
                min="0"
                max="9999"
                className="w-16 h-8 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&]:appearance-none"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-transparent"
                onClick={() => increment("irmaos")}
                disabled={irmaosInput === 9999}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
  )
}