"use client"

import type { FormDataType } from "@/lib/types"

interface GeneralInfoSectionProps {
  formData: FormDataType
  getTipoEventoLabel: (id: string) => string
}

export function GeneralInfoSection({ formData, getTipoEventoLabel }: GeneralInfoSectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wide">Informações Gerais</h3>
      <div className="grid gap-2 text-sm">
        <div className="flex justify-between py-2 border-b border-zinc-800">
          <span className="text-zinc-400">Localidade:</span>
          <span className="text-zinc-100 font-medium">{formData.localidade}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-zinc-800">
          <span className="text-zinc-400">Tipo de Evento:</span>
          <span className="text-zinc-100 font-medium">{getTipoEventoLabel(formData.tipoEvento)}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-zinc-800">
          <span className="text-zinc-400">Data:</span>
          <span className="text-zinc-100 font-medium">
            {new Date(formData.eventoData).toLocaleDateString("pt-BR")}
          </span>
        </div>
        <div className="flex justify-between py-2 border-b border-zinc-800">
          <span className="text-zinc-400">Horário:</span>
          <span className="text-zinc-100 font-medium">{formData.eventoHorario}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-zinc-800">
          <span className="text-zinc-400">Atendimento Presidência:</span>
          <span className="text-zinc-100 font-medium">{formData.atendimentoPresidencia || "—"}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-zinc-800">
          <span className="text-zinc-400">Atendimento Regência:</span>
          <span className="text-zinc-100 font-medium">{formData.atendimentoRegencia || "—"}</span>
        </div>
      </div>
    </div>
  )
}
