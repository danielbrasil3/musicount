{/* UI COMPONENTS */}
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

{/* ICONS */}
import { Plus, Minus } from "lucide-react"


import { validateNumber } from "@/lib/validation"

interface OrganistsFieldProps {
  organistas: number
  increment: () => void
  decrement: () => void
  updateOrganistas: (value: number) => void
}

export function OrganistsField({ organistas, increment, decrement, updateOrganistas}: OrganistsFieldProps) {

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
            onClick={decrement}
            disabled={organistas === 0}
          >
            <Minus className="h-4 w-4" />
          </Button>

          {/* Input para digitar o valor */}
          <Input
            id="organistas"
            type="number"
            min="0"
            max="999"
            value={organistas}
            onChange={(e) => updateOrganistas(validateNumber(Number.parseInt(e.target.value) || 0, 0, 999))}
            className="h-10 text-center text-base font-semibold [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&]:appearance-none"
          />

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full shrink-0 bg-transparent"
            onClick={increment}
            disabled={organistas === 999}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}