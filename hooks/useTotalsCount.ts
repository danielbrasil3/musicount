import { useMemo } from "react"
import type { FormDataType } from "@/lib/types"

export function useTotalsCount(formData: FormDataType) {

  const totalMusicos = useMemo(
    () => Object.values(formData.instrumentos).reduce((sum, v) => sum + v, 0),
    [formData.instrumentos]
  )

  const totalOrquestra = useMemo(
    () => totalMusicos + formData.organistas,
    [totalMusicos, formData.organistas]
  )

  const totalMinisterio = useMemo(
    () => Object.values(formData.ministerio).reduce((sum, v) => sum + v, 0),
    [formData.ministerio]
  )

  const totalIrmandade = useMemo(
    () => formData.irmandade.irmas + formData.irmandade.irmaos,
    [formData.irmandade]
  )

  const totalNaoOrquestra = useMemo(
    () => totalMinisterio + totalIrmandade,
    [totalMinisterio, totalIrmandade]
  )

  const totalComplementos = useMemo(
    () =>
      formData.complementos.hinos.length +
      formData.complementos.coros.length +
      formData.complementos.visitas.length,
    [formData.complementos]
  )

  return {
    totalMusicos,
    totalOrquestra,
    totalMinisterio,
    totalIrmandade,
    totalNaoOrquestra,
    totalComplementos,
  }
}
