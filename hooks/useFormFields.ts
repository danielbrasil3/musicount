
import type { FormDataType } from "@/lib/types"
import { validateString, MAX_NAME_LENGTH, MAX_LOCALIDADE_LENGTH } from "@/lib/validation"



export function useFormFields(
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>,
) {
  const setFieldValue = 
    (key: keyof FormDataType, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }))
    }

  const createInputChangeHandler =
    (key: keyof FormDataType) => {
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        const validatedValue = validateString(e.target.value, key === "localidade" ? MAX_LOCALIDADE_LENGTH : MAX_NAME_LENGTH)
        const nomeCapitalizado = validatedValue.charAt(0).toUpperCase() + validatedValue.substring(1).toLowerCase()
        setFieldValue(key, nomeCapitalizado)
      }
    }

  return { setFieldValue, createInputChangeHandler }
}
