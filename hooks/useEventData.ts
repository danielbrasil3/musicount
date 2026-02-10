import { useCallback } from "react"
import type { SetGeneralInfo } from "@/lib/types"
import { useFormFields } from "./useFormFields"

export function useEventData(
  setFormData: SetGeneralInfo,
) {
  const { setFieldValue } = useFormFields(setFormData)

  const selectEventDate = useCallback((selectedDate: Date | undefined) => {
    if (!selectedDate) {
      setFieldValue("eventoData", "")
      return
    }
    
    // Construir data em formato ISO (YYYY-MM-DD) sem converter para UTC
    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
    const day = String(selectedDate.getDate()).padStart(2, "0")
    const iso = `${year}-${month}-${day}`
    
    setFieldValue("eventoData", iso)
  }, [setFieldValue])

  const setEventTime = useCallback((value: string) => {
    setFieldValue("eventoHorario", value)
  }, [setFieldValue])

  const setEventType = useCallback((value: string) => {
    setFieldValue("tipoEvento", value)
  }, [setFieldValue])

  return {
    selectEventDate,
    setEventTime,
    setEventType,
  }
}
