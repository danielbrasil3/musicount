{/* UI COMPONENTS */}
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

{/* ICONS */}
import { Plus, Minus } from "lucide-react"

{/* TYPES */}
import type { FormDataType } from "@/lib/types"

{/* CONSTANTS */}
import { categoryLabels } from "@/lib/constants"
import { instruments } from "@/lib/constants"
import { validateNumber } from "@/lib/validation"

import Image from "next/image"

interface InstrumentsFieldProps {
  formData: FormDataType
  category: string
  categoryInstruments: typeof instruments
  increment: (id: string) => void
  decrement: (id: string) => void
  updateInstrument: (id: string, value: number) => void
}

export function InstrumentsField({
  formData,
  category,
  categoryInstruments,
  increment,
  decrement,
  updateInstrument,
}: InstrumentsFieldProps) {
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
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/30 transition-colors gap-3"
            >
              {/* Quadrado para imagem do instrumento */}
              <div className="w-12 h-12 rounded-md bg-muted shrink-0 overflow-hidden border border-border/50">
                {/* Espaço reservado para imagem - será preenchido com img ou ícone */}
                {/** 
                <Image
                  src={`/instruments/${instrument.id}.png`}
                  width={100}
                  height={100}
                  alt={instrument.label}
                  className="w-full h-full object-cover"
                />
                **/}
              </div>

              {/* Label do instrumento */}
              <Label className="text-sm font-normal flex-1 cursor-default min-w-0">
                {instrument.label}
              </Label>

              {/* Controles de quantidade */}
              <div className="flex items-center gap-2 shrink-0">
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

                {/* Input para digitar o valor */}
                <Input
                  type="number"
                  min="0"
                  max="999"
                  value={count}
                  onChange={(e) =>
                    updateInstrument(instrument.id, validateNumber(Number.parseInt(e.target.value) || 0, 0, 999))
                  }
                  className="w-14 h-8 text-center font-semibold text-sm p-0 border-border "
                />

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-transparent"
                  onClick={() => increment(instrument.id)}
                  disabled={count === 999}
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