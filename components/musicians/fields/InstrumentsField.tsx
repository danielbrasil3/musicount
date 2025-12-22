
import { categoryLabels } from "@/lib/constants"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"
import type { FormDataType} from "@/lib/types"
import { instruments } from "@/lib/constants"


export function InstrumentsField({
  formData,
  category,
  categoryInstruments,
	increment,
  decrement,
}: {
  formData: FormDataType
  category: string
  categoryInstruments: typeof instruments
  increment: (id: string) => void
  decrement: (id: string) => void
}) {


  return (
    <div key={category} className="space-y-3">
      <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">
        {categoryLabels[category]}
      </h3>
                <div className="space-y-2">
                  {categoryInstruments.map((instrument) => {
                    const count = formData.instrumentos[instrument.id] || 0
                    return (
                      <div
                        key={instrument.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/30 transition-colors"
                      >
                        <Label className="text-sm font-normal flex-1 cursor-default">{instrument.label}</Label>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-transparent"
                            onClick={() => decrement(instrument.id)}
                            disabled={count === 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <div className="w-12 text-center font-semibold text-base">{count}</div>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-transparent"
                            onClick={() => increment(instrument.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
  )
}