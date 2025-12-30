import { useMemo, useCallback } from "react"
import type { FormDataType, SetFormDataType } from "@/lib/types"
import { instruments } from "@/lib/constants"

interface UseInstrumentCountReturn {
  groupedInstruments: Record<string, typeof instruments>
  updateInstrument: (id: string, value: number) => void
  increment: (id: string) => void
  decrement: (id: string) => void
}


export function useInstrumentCount(
  formData: FormDataType,
  setFormData: SetFormDataType,
): UseInstrumentCountReturn {

  const updateInstrument = useCallback(
    (id: string, value: number) => {
      setFormData({
        ...formData,
        instrumentos: {
          ...formData.instrumentos,
          [id]: Math.max(0, value),
        },
      })
    },
    [formData, setFormData],
  )


  const increment = useCallback(
    (id: string) => {
      const current = formData.instrumentos[id] || 0
      updateInstrument(id, current + 1)
    },
    [formData.instrumentos, updateInstrument],
  )


  const decrement = useCallback(
    (id: string) => {
      const current = formData.instrumentos[id] || 0
      updateInstrument(id, current - 1)
    },
    [formData.instrumentos, updateInstrument],
  )

  const groupedInstruments = useMemo(() => {
    const groups: Record<string, typeof instruments> = {}

    instruments.forEach((instrument) => {
      if (!groups[instrument.category]) {
        groups[instrument.category] = []
      }
      groups[instrument.category].push(instrument)
    })

    return groups
  }, [])

  return {
    groupedInstruments,
    updateInstrument,
    increment,
    decrement,
  }
}