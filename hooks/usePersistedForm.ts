import { useLocalStorage } from "./useLocalStorage"
import { useCallback } from "react"


export function usePersistedForm<T>(key: string, initial: T) {
  const [formData, setFormDataRaw] = useLocalStorage<T>(key, initial)

  // Wrapper que garante que setFormData sempre persista mudanças
  const setFormData = useCallback((
    updater: T | ((prev: T) => T)
  ) => {
    setFormDataRaw(updater)
  }, [setFormDataRaw])

  const resetForm = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key)
    }

    setFormData(initial)
  }

  return {
    formData,
    setFormData,
    resetForm,
  }
}
