import type { FormDataType } from "@/lib/types"
import { useLocalStorage } from "./useLocalStorage"
import { INITIAL_FORM_DATA } from "@/lib/constants"

const STORAGE_KEY = "ensaio-form"


export function usePersistedForm() {
    const [formData, setFormData] = useLocalStorage<FormDataType>(STORAGE_KEY, INITIAL_FORM_DATA)

  const resetForm = () => {
    localStorage.removeItem(STORAGE_KEY)
    setFormData(INITIAL_FORM_DATA)
  }

  return {
    formData,
    setFormData,
    resetForm,
  }
}
