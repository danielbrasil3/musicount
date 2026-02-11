"use client"

import { useEffect, useRef, useState } from "react"

const STORAGE_VERSION = "v2"

export function useLocalStorage<T>(key: string, initialValue: T) {
  const versionedKey = `${key}_${STORAGE_VERSION}`

  const [value, setValue] = useState<T>(initialValue)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    
    try {
      const stored = localStorage.getItem(versionedKey)
      if (stored) {
        const parsed = JSON.parse(stored)
        setValue(parsed)
      }
    } catch (err) {
      console.error(`Erro ao ler localStorage para chave '${versionedKey}':`, err)
      localStorage.removeItem(versionedKey)
    }
    
  }, [versionedKey, isMounted])

  
  const isInitialized = useRef(false)

  useEffect(() => {
    if (!isMounted) return

    try {
      localStorage.setItem(versionedKey, JSON.stringify(value))
      isInitialized.current = true
    } catch (err) {
      console.error(`Erro ao salvar localStorage para chave '${versionedKey}':`, err)
    }
  }, [versionedKey, value, isMounted])

  return [value, setValue] as const
}
