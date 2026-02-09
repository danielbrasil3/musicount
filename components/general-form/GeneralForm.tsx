"use client"

import { useState } from "react"

{/* FIELDS */}
import { EventTypeField } from "./fields/EventTypeField"
import { LocationField } from "./fields/LocationField"
import { AttendanceField } from "./fields/AttendanceField"

{/* HOOKS */}
import { usePersistedForm } from "@/hooks/usePersistedForm"

{/* CONSTANTS */}
import { INITIAL_GENERAL } from "@/lib/constants"

{/* GUARD */}
import { canProceedToNextStep } from "@/lib/formGuards"
import { Button } from "../ui/button"



interface GeneralFormProps {
  onNext: () => void
  onReset: () => void
}

export default function GeneralForm({onNext, onReset}: GeneralFormProps) {
  const {formData, setFormData, resetForm} = usePersistedForm("general", INITIAL_GENERAL)
  const [currentStep, setCurrentStep] = useState(0)
  
  

  

  function handleNext(e: React.FormEvent) {
      e.preventDefault()
      if (currentStep < 2) {
        setCurrentStep((s) => s + 1)
      } else {
        onNext()
      }
    }

  const canProceed = Boolean(canProceedToNextStep(currentStep, formData))


  
  return (
    <form onSubmit={handleNext} className="space-y-6">
      {/* Localidade */}
      <LocationField
        currentStep={currentStep}
        localidade={formData.localidade}
        setFormData={setFormData}
        onReset={onReset}
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
