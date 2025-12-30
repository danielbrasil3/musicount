import { useCallback } from "react"
import { validatePDFDataAsArray, validatePDFData } from "@/lib/schemas"
import type { FormDataType } from "@/lib/types"
import { toast } from "sonner"

/**
 * Hook para validação de dados do formulário antes de gerar PDF
 */
export function useFormValidation() {
  /**
   * Valida dados e retorna um resultado estruturado com erros por campo
   */
  const validateForm = useCallback((formData: unknown) => {
    return validatePDFData(formData)
  }, [])

  /**
   * Valida dados e retorna um array de erros para exibição
   */
  const validateFormAsArray = useCallback((formData: unknown) => {
    return validatePDFDataAsArray(formData)
  }, [])

  /**
   * Valida dados e exibe toast com erros encontrados
   * Retorna true se válido, false caso contrário
   */
  const validateAndNotify = useCallback((formData: FormDataType): boolean => {
    const validation = validatePDFDataAsArray(formData)

    if (!validation.valid) {
      validation.errors.forEach((error) => {
        toast.error(error)
      })
      return false
    }

    return true
  }, [])

  return {
    validateForm,
    validateFormAsArray,
    validateAndNotify,
  }
}
