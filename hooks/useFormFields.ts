import { useCallback } from "react"
import type { GeneralInfo } from "@/lib/types"
import { validateString, MAX_NAME_LENGTH, MAX_LOCALIDADE_LENGTH } from "@/lib/validation"



export function useFormFields(
  setFormData: React.Dispatch<React.SetStateAction<GeneralInfo>>,
) {
  const setFieldValue = useCallback(
    <K extends keyof GeneralInfo>(key: K, value: GeneralInfo[K]) => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }))
    },
    [setFormData]
  )

  const createInputChangeHandler = useCallback(
    (key: keyof GeneralInfo) => {
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        const validatedValue = validateString(e.target.value, key === "localidade" ? MAX_LOCALIDADE_LENGTH : MAX_NAME_LENGTH)
        const nomeCapitalizado = validatedValue.charAt(0).toUpperCase() + validatedValue.substring(1).toLowerCase()
        setFieldValue(key, nomeCapitalizado)
      }
    },
    [setFieldValue]
  )

  return { setFieldValue, createInputChangeHandler }
}
