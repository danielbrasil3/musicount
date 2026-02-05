"use client"

import { useEffect, useRef, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? (JSON.parse(stored) as T) : initialValue
    } catch (err) {
      console.error("Erro ao ler localStorage", err)
      return initialValue
    }
  })

  const isFirstPersist = useRef(true)

  // Persistir mudanças após hidratação inicial
  useEffect(() => {
    if (isFirstPersist.current) {
      isFirstPersist.current = false
      return
    }

    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error("Erro ao salvar localStorage", err)
    }
  }, [key, value])

  return [value, setValue] as const
}
