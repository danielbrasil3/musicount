import { useCallback } from "react"
import type { FormDataType, SetFormDataType } from "@/lib/types"

interface UseComplementsReturn {
  hinos: string[]
  coros: string[]
  visitas: string[]
  addItem: (type: "hinos" | "coros" | "visitas", value: string) => void
  removeItem: (type: "hinos" | "coros" | "visitas", index: number) => void
}

export function useComplements(
  formData: FormDataType,
  setFormData: SetFormDataType,
): UseComplementsReturn {


  const addItem = useCallback(
    (type: "hinos" | "coros" | "visitas", value: string) => {
      const trimmedValue = value.trim()
      
      if (!trimmedValue) return

      // Evita duplicatas
      if (formData.complementos[type].includes(trimmedValue)) return

      setFormData({
        ...formData,
        complementos: {
          ...formData.complementos,
          [type]: [...formData.complementos[type], trimmedValue],
        },
      })
    },
    [formData, setFormData],
  )


  const removeItem = useCallback(
    (type: "hinos" | "coros" | "visitas", index: number) => {
      setFormData({
        ...formData,
        complementos: {
          ...formData.complementos,
          [type]: formData.complementos[type].filter((_, i) => i !== index),
        },
      })
    },
    [formData, setFormData],
  )


  return {
    hinos: formData.complementos.hinos,
    coros: formData.complementos.coros,
    visitas: formData.complementos.visitas,
    addItem,
    removeItem,
  }
}
