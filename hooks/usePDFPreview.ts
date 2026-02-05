import { useState, useCallback } from "react"
import type { FormDataType } from "@/lib/types"
import { useFormValidation } from "./useFormValidation"

interface PDFGeneratorModule {
  usePDFGenerator: (formData: FormDataType) => {
    generatePDFWithBlob: () => Promise<Blob | null>
  }
}

export function usePDFPreview(formData: FormDataType) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

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

    const pdfGeneratorModule = (await import("./usePDFGenerator")) as PDFGeneratorModule
    const { generatePDFWithBlob } = pdfGeneratorModule.usePDFGenerator(formData)
    const pdfBlob = await generatePDFWithBlob()

    if (!pdfBlob) {
      setError("Erro ao gerar PDF. Verifique os dados e tente novamente.")
      return
    }

    setPdfUrl(URL.createObjectURL(pdfBlob))
  }, [formData, validateFormAsArray])

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
