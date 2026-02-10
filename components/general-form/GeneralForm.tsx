"use client"

import { useState, useMemo, useEffect } from "react"

{/* FIELDS */}
import { EventTypeField } from "./fields/EventTypeField"
import { LocationField } from "./fields/LocationField"
import { AttendanceField } from "./fields/AttendanceField"

{/* HOOKS */}
import { usePersistedForm } from "@/hooks/usePersistedForm"

{/* CONSTANTS */}
import { INITIAL_GENERAL, INITIAL_MUSICIANS, INITIAL_COMPARECIMENTO, INITIAL_COMPLEMENTOS } from "@/lib/constants"

{/* GUARD */}
import { canProceedToNextStep } from "@/lib/formGuards"
import { Button } from "../ui/button"



interface GeneralFormProps {
  onNext: () => void
  onReset: () => void
}

export default function GeneralForm({onNext, onReset}: GeneralFormProps) {
  const {formData, setFormData, resetForm} = usePersistedForm("general", INITIAL_GENERAL)
  const { resetForm: resetMusicians } = usePersistedForm("musicians", INITIAL_MUSICIANS)
  const { resetForm: resetComparecimento } = usePersistedForm("comparecimento", INITIAL_COMPARECIMENTO)
  const { resetForm: resetComplementos } = usePersistedForm("complementos", INITIAL_COMPLEMENTOS)
  const [currentStep, setCurrentStep] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)
  
  // Força validação após hidratação
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  function handleNext(e: React.FormEvent) {
      e.preventDefault()
      if (currentStep < 2) {
        setCurrentStep((s) => s + 1)
      } else {
        onNext()
      }
    }

  function handleReset() {
    resetForm()
    resetMusicians()
    resetComparecimento()
    resetComplementos()
    setCurrentStep(0)
    onReset()
  }


  const canProceed = useMemo(() => {
    // Só valida após hidratação para evitar problemas com SSR
    if (!isHydrated) return false
    return Boolean(canProceedToNextStep(currentStep, formData))
  }, [currentStep, formData, isHydrated])


  
  return (
    <form onSubmit={handleNext} className="space-y-6">
      {/* Localidade */}
      <LocationField
        currentStep={currentStep}
        localidade={formData.localidade}
        setFormData={setFormData}
        onReset={handleReset}
      />

      {/* Tipo de Evento */}
      {currentStep >= 1 && (
        <EventTypeField
          eventoData={formData.eventoData}
          eventoHorario={formData.eventoHorario}
          tipoEvento={formData.tipoEvento}
          setFormData={setFormData}
        />
      )}

      {/* Atendimento */}
      {currentStep >= 2 && (
        <AttendanceField 
          atendimentoPresidencia={formData.atendimentoPresidencia}
          atendimentoRegencia={formData.atendimentoRegencia}
          setFormData={setFormData} 
        />
      )}

      {currentStep >= 0 && (
        <Button
          type="submit"
          className="w-full h-12 text-base font-medium transition-all duration-300 bg-primary text-primary-foreground rounded-md disabled:bg-primary/90"
          disabled={!canProceed}
          suppressHydrationWarning
        >
          {currentStep < 2 ? "Continuar" : "Próximo"}
        </Button>
      )}
    </form>
  )
}
