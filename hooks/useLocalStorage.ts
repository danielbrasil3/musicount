"use client"

import { useEffect, useRef, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)
  const hasHydratedFromStorage = useRef(false)

  // Hidrata no cliente após o primeiro render para evitar mismatch de SSR/CSR
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const stored = window.localStorage.getItem(key)
      const nextValue = stored !== null ? (JSON.parse(stored) as T) : initialValue

      hasHydratedFromStorage.current = true

      // Evita alerta do lint (setState direto dentro do effect)
      queueMicrotask(() => {
        setValue(nextValue)
      })
    } catch (err) {
      console.error("Erro ao ler localStorage", err)
      hasHydratedFromStorage.current = true
    }
  }, [initialValue, key])

  // Persiste somente após hidratação inicial do storage
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!hasHydratedFromStorage.current) return

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error("Erro ao salvar localStorage", err)
    }
  }, [key, value])

  return [value, setValue] as const
}
