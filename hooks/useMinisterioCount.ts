import { useCallback } from "react"
import type { FormDataType, SetFormDataType } from "@/lib/types"

export function useMinisterioCount(formData: FormDataType, setFormData: SetFormDataType) {
  const updateMinisterio = useCallback(
    (type: string, delta: number) => {
      setFormData((prev) => ({
        ...prev,
        ministerio: {
          ...prev.ministerio,
          [type]: Math.max(0, (prev.ministerio[type] || 0) + delta),
        },
      }))
    },
    [setFormData],
  )

  const setMinisterio = useCallback(
    (type: string, value: number) => {
      setFormData((prev) => ({
        ...prev,
        ministerio: {
          ...prev.ministerio,
          [type]: Math.max(0, value),
        },
      }))
    },
    [setFormData],
  )

  const increment = useCallback(
    (type: string) => {
      updateMinisterio(type, 1)
    },
    [updateMinisterio],
  )

  const decrement = useCallback(
    (type: string) => {
      updateMinisterio(type, -1)
    },
    [updateMinisterio],
  )


  return {
    ministerio: formData.ministerio,
    updateMinisterio,
    setMinisterio,
    increment,
    decrement,
  }
}
