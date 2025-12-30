import { useState, useCallback } from "react"
import type { FormDataType } from "@/lib/types"
import { usePDFGenerator } from "./usePDFGenerator"
import { useFormValidation } from "./useFormValidation"

export function usePDFPreview(formData: FormDataType) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const { generatePDFWithBlob } = usePDFGenerator(formData)
  const { validateFormAsArray } = useFormValidation()

  const generate = useCallback(async () => {
    setError(null)
    setValidationErrors([])

    const validation = validateFormAsArray(formData)
    if (!validation.valid) {
      setValidationErrors(validation.errors)
      setError("Existem erros de validação. Verifique os dados abaixo.")
      return
    }

    const pdfBlob = await generatePDFWithBlob()
    if (!pdfBlob) {
      setError("Erro ao gerar PDF. Verifique os dados e tente novamente.")
      return
    }

    setPdfUrl(URL.createObjectURL(pdfBlob))
  }, [formData, generatePDFWithBlob, validateFormAsArray])

  const close = useCallback(() => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl)
    setPdfUrl(null)
  }, [pdfUrl])

  return {
    pdfUrl,
    error,
    validationErrors,
    generate,
    close,
  }
}
