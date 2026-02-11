"use client"

import { useEffect, useRef, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        const parsed = JSON.parse(stored)
        setValue(parsed)
      }
    } catch (err) {
      console.error(`Erro ao ler localStorage para chave '${key}':`, err)
      localStorage.removeItem(key)
    }
    
  }, [key, isMounted])

  
  const isInitialized = useRef(false)

  useEffect(() => {
    if (!isMounted) return

    try {
      localStorage.setItem(key, JSON.stringify(value))
      isInitialized.current = true
    } catch (err) {
      console.error(`Erro ao salvar localStorage para chave '${key}':`, err)
    }
  }, [key, value, isMounted])

  return [value, setValue] as const
}
