import type { FormDataType } from "@/lib/types"
import { useLocalStorage } from "./useLocalStorage"


const STORAGE_KEY = "ensaio-form"

export function usePersistedForm<T>(key: string, initial: T) {
  const [formData, setFormData] = useLocalStorage<T>(key, initial)

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
