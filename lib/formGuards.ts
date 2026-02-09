import type { GeneralInfo } from "@/lib/types"

export function canProceedToNextStep(
  step: number,
  formData: GeneralInfo,
) {
  if (step === 0) {
    return formData.localidade.trim() !== ""
  }

  if (step === 1) {
    return (
      formData.tipoEvento.trim() !== "" &&
      formData.eventoData !== "" &&
      formData.eventoHorario !== ""
    )
  }

  return true
}
