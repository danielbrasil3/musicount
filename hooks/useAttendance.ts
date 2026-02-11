import { useCallback } from "react"
import type { SetGeneralInfo } from "@/lib/types"

interface UseAttendanceReturn {
  items: string[]
  add: (value: string) => void
  remove: (index: number) => void
}

export function useAttendance(
  atendimentoRegencia: string[],
  setFormData: SetGeneralInfo,
): UseAttendanceReturn {
  const add = useCallback(
    (value: string) => {
      const trimmed = value.trim()
      if (!trimmed) return
      setFormData((prev) => ({
        ...prev,
        atendimentoRegencia: [...(prev.atendimentoRegencia || []), trimmed],
      }))
    },
    [setFormData],
  )

  const remove = useCallback(
    (index: number) => {
      setFormData((prev) => ({
        ...prev,
        atendimentoRegencia: (prev.atendimentoRegencia || []).filter((_, i) => i !== index),
      }))
    },
    [setFormData],
  )

  return {
    items: atendimentoRegencia || [],
    add,
    remove,
  }
}
