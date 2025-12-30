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

interface PreviewFieldProps {
  formData: FormDataType
  onReset: () => void
}

export default function PreviewField({ formData, onReset }: PreviewFieldProps) {
  const { pdfUrl, error, validationErrors, generate, close } = usePDFPreview(formData)
  const { getTipoEventoLabel, getInstrumentLabel, getMinisterioLabel } = usePDFGenerator(formData)


  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
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
        onReset={onReset}
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
