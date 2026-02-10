"use client"

{/* HOOKS */}
import { usePDFGenerator } from "@/hooks/usePDFGenerator"
import { usePDFPreview } from "@/hooks/usePDFPreview"
import { usePersistedForm } from "@/hooks/usePersistedForm"

{/* FIELDS */}
import { PreviewCard } from "./fields/previewCard"
import { PDFViewer } from "./fields/pdfViewer"
import { GeneratePDFButton } from "./fields/generatePDFButton"

{/* ALERTS */}
import ErrorAlert from "@/components/alerts/errorAlert"
import ValidationErrorsAlert from "@/components/alerts/validationErrorsAlert"
import { PDFOfflineWarning } from "@/components/pwa/PDFOfflineWarning"

{/* CONSTANTS */}
import { INITIAL_GENERAL, INITIAL_MUSICIANS, INITIAL_COMPARECIMENTO, INITIAL_COMPLEMENTOS } from "@/lib/constants"

interface PreviewFieldProps {
  onReset: () => void
}

export default function PreviewField({ onReset }: PreviewFieldProps) {
  const { formData: generalData, resetForm: resetGeneral } = usePersistedForm("general", INITIAL_GENERAL)
  const { formData: musiciansData, resetForm: resetMusicians } = usePersistedForm("musicians", INITIAL_MUSICIANS)
  const { formData: comparecimentoData, resetForm: resetComparecimento } = usePersistedForm("comparecimento", INITIAL_COMPARECIMENTO)
  const { formData: complementosData, resetForm: resetComplementos } = usePersistedForm("complementos", INITIAL_COMPLEMENTOS)

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
        <PDFViewer 
          pdfUrl={pdfUrl} 
          onClose={close}
          eventDate={generalData.eventoData}
          eventLocation={generalData.localidade}
          eventType={generalData.tipoEvento}
        />
      ) : (
        <GeneratePDFButton onClick={generate} />
      )}
    </div>
  )
}
