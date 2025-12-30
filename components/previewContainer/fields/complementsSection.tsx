"use client"

import type { FormDataType } from "@/lib/types"

interface ComplementsSectionProps {
  formData: FormDataType
}

export function ComplementsSection({ formData }: ComplementsSectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wide">Complementos</h3>
      <div className="space-y-3 text-sm">
        {formData.complementos.hinos.length > 0 && (
          <div>
            <span className="text-zinc-400">Hinos:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.complementos.hinos.map((hino, idx) => (
                <span key={idx} className="px-2 py-1 bg-zinc-800 rounded text-zinc-100 text-xs">
                  {hino}
                </span>
              ))}
            </div>
          </div>
        )}
        {formData.complementos.coros.length > 0 && (
          <div>
            <span className="text-zinc-400">Coros:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.complementos.coros.map((coro, idx) => (
                <span key={idx} className="px-2 py-1 bg-zinc-800 rounded text-zinc-100 text-xs">
                  {coro}
                </span>
              ))}
            </div>
          </div>
        )}
        {formData.complementos.visitas.length > 0 && (
          <div>
            <span className="text-zinc-400">Visitas:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.complementos.visitas.map((visita, idx) => (
                <span key={idx} className="px-2 py-1 bg-zinc-800 rounded text-zinc-100 text-xs">
                  {visita}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
