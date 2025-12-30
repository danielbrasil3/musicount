"use client"

import type React from "react"

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


interface GeneralFormProps {
  formData: FormDataType
  setFormData: SetFormDataType
  currentStep: number
  onNext: (e: React.FormEvent) => void
  onReset: () => void
}

export default function GeneralForm({ formData, setFormData, currentStep, onNext, onReset}: GeneralFormProps) {
  const canProceed = useMemo(
    () => canProceedToNextStep(currentStep, formData),
    [currentStep, formData],
  )



  return (
    <form onSubmit={onNext} className="space-y-6">
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
        <button
          type="submit"
          className="w-full h-12 text-base font-medium transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 bg-primary text-primary-foreground rounded-md"
          disabled={!canProceed}
        >
          {currentStep < 2 ? "Continuar" : "Próximo"}
        </button>
      )}
    </form>
  )
}
