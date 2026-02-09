import { useCallback } from "react"
import type { SetGeneralInfo } from "@/lib/types"
import { useFormFields } from "./useFormFields"

export function useEventData(
  setFormData: SetGeneralInfo,
) {
  const { setFieldValue } = useFormFields(setFormData)

  const selectEventDate = useCallback((selectedDate: Date | undefined) => {
    const iso = selectedDate ? selectedDate.toISOString().split("T")[0] : ""
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
