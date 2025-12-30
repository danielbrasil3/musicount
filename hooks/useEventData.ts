import { useState } from "react"
import type { FormDataType } from "@/lib/types"
import { useFormFields } from "./useFormFields"

export function useEventData(
  eventoData: string,
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>,
) {
  const [date, setDate] = useState<Date | undefined>(
    eventoData ? new Date(eventoData) : undefined
  )

  const { setFieldValue } = useFormFields(setFormData)

  const selectEventDate = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    const iso = selectedDate ? selectedDate.toISOString().split("T")[0] : ""
    setFieldValue("eventoData", iso)
}

  const setEventTime = (value: string) => {
    setFieldValue("eventoHorario", value)
  }

  const setEventType = (value: string) => {
    setFieldValue("tipoEvento", value)
  }


  return {
    date,
    selectEventDate,
    setEventTime,
    setEventType,
  }
}
