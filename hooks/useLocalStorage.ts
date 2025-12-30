"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)

  // Ler do localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored !== null) {
        setValue(JSON.parse(stored))
      }
    } catch (err) {
      console.error("Erro ao ler localStorage", err)
    }
  }, [key])

  // Salvar no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error("Erro ao salvar localStorage", err)
    }
  }, [key, value])





  return [value, setValue] as const
}
