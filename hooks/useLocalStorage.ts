"use client"

import { useEffect, useRef, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Initialize with localStorage value only if available, otherwise use initial
  const [value, setValue] = useState<T>(() => {
    // This runs during render to set initial state quickly
    if (typeof window === "undefined") return initialValue
    
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : initialValue
    } catch {
      return initialValue
    }
  })
  
  const prev = useRef(value)

  // Persist changes to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return
    if (Object.is(prev.current, value)) return

    prev.current = value

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error("Erro ao salvar localStorage", err)
    }
  }, [key, value])

  return [value, setValue] as const
}
