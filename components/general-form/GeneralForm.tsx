"use client"

import { useState } from "react"

{/* FIELDS */}
import { EventTypeField } from "./fields/EventTypeField"
import { LocationField } from "./fields/LocationField"
import { AttendanceField } from "./fields/AttendanceField"

{/* TYPES */}
import type { FormDataType, SetFormDataType } from "@/lib/types"

{/* HOOKS */}
import { useMemo } from "react"

{/* GUARD */}
import { canProceedToNextStep } from "@/lib/formGuards"
import { Button } from "../ui/button"


interface GeneralFormProps {
  formData: FormDataType
  setFormData: SetFormDataType
  onNext: () => void
  onReset: () => void
}

export default function GeneralForm({ formData, setFormData, onNext, onReset}: GeneralFormProps) {
  const [currentStep, setCurrentStep] = useState(0)

  function handleNext(e: React.FormEvent) {
      e.preventDefault()
      if (currentStep < 2) {
        setCurrentStep((s) => s + 1)
      } else {
        onNext()
      }
    }

  const canProceed = useMemo(
    () => canProceedToNextStep(currentStep, formData),
    [currentStep, formData],
  )


  
  return (
    <form onSubmit={handleNext} className="space-y-6">
      {/* Localidade */}
      <LocationField
        currentStep={currentStep}
        formData={formData}
        setFormData={setFormData}
        onReset={onReset}
      />

      {/* Tipo de Evento */}
      {currentStep >= 1 && (
        <EventTypeField
          eventoData={formData.eventoData}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {/* Atendimento */}
      {currentStep >= 2 && (
        <AttendanceField formData={formData} setFormData={setFormData} />
      )}

      {currentStep >= 0 && (
        <Button
          type="submit"

          className="w-full h-12 text-base font-medium transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 bg-primary text-primary-foreground rounded-md disabled:bg-primary/90"
          disabled={!canProceed}
        >
          {currentStep < 2 ? "Continuar" : "Próximo"}
        </Button>
      )}
    </form>
  )
}
