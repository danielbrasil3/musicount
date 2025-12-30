import { useCallback, useMemo } from "react"
import type { FormDataType, SetFormDataType } from "@/lib/types"

export function useIrmandadeCount(formData: FormDataType, setFormData: SetFormDataType) {
  const setIrmandadeCount = useCallback(
    (field: "irmas" | "irmaos", value: number) => {
      setFormData((prev) => ({
        ...prev,
        irmandade: {
          ...prev.irmandade,
          [field]: Math.max(0, Math.min(9999, value)),
        },
      }))
    },
    [setFormData],
  )


  const increment = useCallback((field: "irmas" | "irmaos") => {
    setFormData((prev) => ({
      ...prev,
      irmandade: {
        ...prev.irmandade,
        [field]: Math.max(0, Math.min(9999, prev.irmandade[field] + 1)),
      },
    }))
  }, [setFormData])

  const decrement = useCallback((field: "irmas" | "irmaos") => {
    setFormData((prev) => ({
      ...prev,
      irmandade: {
        ...prev.irmandade,
        [field]: Math.max(0, prev.irmandade[field] - 1),
      },
    }))
  }, [setFormData])



  return {
    irmas: formData.irmandade.irmas,
    irmaos: formData.irmandade.irmaos,
    setIrmandadeCount,
    increment,
    decrement,
  }
}
