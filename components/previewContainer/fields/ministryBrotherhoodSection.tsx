"use client"

import type { FormDataType } from "@/lib/types"

interface MinistryBrotherhoodSectionProps {
  formData: FormDataType
  getMinisterioLabel: (id: string) => string
}

export function MinistryBrotherhoodSection({ formData, getMinisterioLabel }: MinistryBrotherhoodSectionProps) {
  const totalMinisterio = Object.values(formData.ministerio).reduce((a, b) => a + b, 0)
  const totalIrmandade = formData.irmandade.irmas + formData.irmandade.irmaos

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wide">Ministério e Irmandade</h3>
      <div className="grid gap-2 text-sm">
        {Object.entries(formData.ministerio)
          .filter(([, count]) => count > 0)
          .map(([key, count]) => (
            <div key={key} className="flex justify-between py-2 border-b border-zinc-800">
              <span className="text-zinc-400">{getMinisterioLabel(key)}:</span>
              <span className="text-zinc-100 font-medium">{count}</span>
            </div>
          ))}
        <div className="flex justify-between py-2 border-b border-zinc-800">
          <span className="text-zinc-400">Irmãs:</span>
          <span className="text-zinc-100 font-medium">{formData.irmandade.irmas}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-zinc-800">
          <span className="text-zinc-400">Irmãos:</span>
          <span className="text-zinc-100 font-medium">{formData.irmandade.irmaos}</span>
        </div>
        <div className="flex justify-between py-2 bg-zinc-800/50 px-3 rounded-lg mt-2">
          <span className="text-zinc-100 font-semibold">Total:</span>
          <span className="text-blue-400 font-bold">{totalMinisterio + totalIrmandade}</span>
        </div>
      </div>
    </div>
  )
}
