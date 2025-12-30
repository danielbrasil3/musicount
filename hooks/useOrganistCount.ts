import { useCallback } from "react"
import type { FormDataType, SetFormDataType } from "@/lib/types"

interface UseOrganistCountReturn {
  organistas: number
  updateOrganistas: (value: number) => void
  increment: () => void
  decrement: () => void
}


export function useOrganistCount(
  formData: FormDataType,
  setFormData: SetFormDataType,
): UseOrganistCountReturn {

  const updateOrganistas = useCallback(
    (value: number) => {
      setFormData({
        ...formData,
        organistas: Math.max(0, value),
      })
    },
    [formData, setFormData],
  )

  const increment = useCallback(() => {
    updateOrganistas(formData.organistas + 1)
  }, [formData.organistas, updateOrganistas])

  const decrement = useCallback(() => {
    updateOrganistas(formData.organistas - 1)
  }, [formData.organistas, updateOrganistas])

  return {
    organistas: formData.organistas,
    updateOrganistas,
    increment,
    decrement,
  }
}
