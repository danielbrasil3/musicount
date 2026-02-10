"use client"

{/* UI COMPONENTS */}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert } from "@/components/ui/alert"

{/* ICONS */}
import { FileText, Download, X, AlertCircle } from "lucide-react"

{/* TYPES */}
import type { FormDataType } from "@/lib/types"

{/* HOOKS */}
import { usePDFGenerator } from "@/hooks/usePDFGenerator"
import { usePDFPreview } from "@/hooks/usePDFPreview"

{/* FIELDS */}
import { PreviewCard } from "./fields/previewCard"
import { PDFViewer } from "./fields/pdfViewer"
import { GeneratePDFButton } from "./fields/generatePDFButton"

{/* ALERTS */}
import ErrorAlert from "@/components/alerts/errorAlert"
import ValidationErrorsAlert from "@/components/alerts/validationErrorsAlert"
import { usePersistedForm } from "@/hooks/usePersistedForm"
import { INITIAL_GENERAL, INITIAL_MUSICIANS, INITIAL_COMPARECIMENTO, INITIAL_COMPLEMENTOS } from "@/lib/constants"
import { PDFOfflineWarning } from "@/components/pwa/PDFOfflineWarning"

interface PreviewFieldProps {
  onReset: () => void
}

export default function PreviewField({ onReset }: PreviewFieldProps) {
  const { formData: generalData, resetForm: resetGeneral } = usePersistedForm("general", INITIAL_GENERAL)
  const { formData: musiciansData, resetForm: resetMusicians } = usePersistedForm("musicians", INITIAL_MUSICIANS)
  const { formData: comparecimentoData, resetForm: resetComparecimento } = usePersistedForm("comparecimento", INITIAL_COMPARECIMENTO)
  const { formData: complementosData, resetForm: resetComplementos } = usePersistedForm("complementos", INITIAL_COMPLEMENTOS)

  // Combinar todos os dados separados em um único FormDataType
  const formData = {
    ...generalData,
    ...musiciansData,
    ...comparecimentoData,
    ...complementosData,
  }

  const { pdfUrl, error, validationErrors, generate, close } = usePDFPreview(formData)
  const { getTipoEventoLabel, getInstrumentLabel, getMinisterioLabel } = usePDFGenerator(formData)

  function handleReset() {
    // limpar todos os formulários persistidos e voltar ao início
    try {
      resetGeneral()
      resetMusicians()
      resetComparecimento()
      resetComplementos()
    } finally {
      onReset()
    }
  }


  return (
    <div className="space-y-6">
      
      {/* Avisos de status offline */}
      <PDFOfflineWarning />
      
      {/* Error Alert */}
      {error && <ErrorAlert message={error} />}
      {validationErrors.length > 0 && (
        <ValidationErrorsAlert errors={validationErrors} />
      )}

      {/* Preview Card */}
      <PreviewCard
        formData={formData}
        getTipoEventoLabel={getTipoEventoLabel}
        getInstrumentLabel={getInstrumentLabel}
        getMinisterioLabel={getMinisterioLabel}
        onReset={handleReset}
      />

      {/* PDF Viewer */}

      {pdfUrl ? (
        <PDFViewer pdfUrl={pdfUrl} onClose={close} />
      ) : (
        <GeneratePDFButton onClick={generate} />
      )}
    </div>
  )
}
