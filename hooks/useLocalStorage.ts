"use client"

import { useEffect, useRef, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Initialize with localStorage value only if available, otherwise use initial
  const [value, setValue] = useState<T>(() => {
    // This runs during render to set initial state quickly
    if (typeof window === "undefined") return initialValue
    
    try {
      const stored = window.localStorage.getItem(key)
      if (stored) {
        return JSON.parse(stored) as T
      }
    } catch (err) {
      console.error(`Erro ao ler localStorage para chave '${key}':`, err)
    }
    
    return initialValue
  })
  
  const isInitialized = useRef(false)

  // Persist changes to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      // Always sync on first render and when value changes
      window.localStorage.setItem(key, JSON.stringify(value))
      isInitialized.current = true
    } catch (err) {
      console.error(`Erro ao salvar localStorage para chave '${key}':`, err)
    }
  }, [key, value])

  return [value, setValue] as const
}
