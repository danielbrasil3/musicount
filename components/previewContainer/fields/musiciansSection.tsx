"use client"

import type { FormDataType } from "@/lib/types"

interface MusiciansectionProps {
  formData: FormDataType
  getInstrumentLabel: (id: string) => string
}

export function MusiciansSection({ formData, getInstrumentLabel }: MusiciansectionProps) {
  const totalMusicos = formData.organistas + Object.values(formData.instrumentos).reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wide">Músicos</h3>
      <div className="grid gap-2 text-sm">
        <div className="flex justify-between py-2 border-b border-zinc-800">
          <span className="text-zinc-400">Organistas:</span>
          <span className="text-zinc-100 font-medium">{formData.organistas}</span>
        </div>
        {Object.entries(formData.instrumentos)
          .filter(([, count]) => count > 0)
          .map(([key, count]) => (
            <div key={key} className="flex justify-between py-2 border-b border-zinc-800">
              <span className="text-zinc-400">{getInstrumentLabel(key)}:</span>
              <span className="text-zinc-100 font-medium">{count}</span>
            </div>
          ))}
        <div className="flex justify-between py-2 bg-zinc-800/50 px-3 rounded-lg mt-2">
          <span className="text-zinc-100 font-semibold">Total de Músicos:</span>
          <span className="text-blue-400 font-bold">{totalMusicos}</span>
        </div>
      </div>
    </div>
  )
}
