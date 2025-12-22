"use client"

import type React from "react"

import { useState } from "react"

{/* UI COMPONENTS */}
import { Button } from "@/components/ui/button"
import { MusiciansForm } from "@/components/musicians"

{/* COMPONENTS */}
import { EventTypeField } from "./EventTypeField"
import { LocationField } from "./LocationField"
import { AttendanceField } from "./AttendanceField"
{/* TYPES */}
import type { FormDataType } from "@/lib/types"

export function GeralForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showMusicians, setShowMusicians] = useState(false)

  const [formData, setFormData] = useState<FormDataType>({
    localidade: "",
    eventoData: "",
    eventoHorario: "",
    tipoEvento: "",
    atendimentoPresidencia: "",
    atendimentoRegencia: "",
    instrumentos: {},
    organistas: 0,
  })

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    } else {
      // Ao atingir o último passo, mostrar o formulário de músicos
      setShowMusicians(true)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Dados do formulário:", formData)
  }

  const canProceed = () => {
    if (currentStep === 0) return formData.localidade.trim() !== ""
    if (currentStep === 1) {
      return (
        formData.eventoData !== "" &&
        formData.eventoHorario !== "" &&
        formData.tipoEvento !== ""
      )
    }
    return true
  }

  if (showMusicians) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => {
              setShowMusicians(false)
              setCurrentStep(2)
            }}
          >
            Voltar
          </Button>
        </div>

        <MusiciansForm formData={formData} setFormData={setFormData} />
      </div>
    )
  }

  return (
    <form onSubmit={handleNext} className="space-y-6">
      {/* Localidade */}
      <LocationField
        formData={formData}
        setFormData={setFormData}
        currentStep={currentStep}
      />

      {/* Tipo de Evento */}
      {currentStep >= 1 && (
        <EventTypeField
          formData={formData}
          setFormData={setFormData}
          currentStep={currentStep}
        />
      )}

      {/* Atendimento */}
      {currentStep >= 2 && (
        <AttendanceField formData={formData} setFormData={setFormData} />
      )}

      {currentStep >= 0 && (
        <Button
          type="submit"
          className="w-full h-12 text-base font-medium transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
          size="lg"
          disabled={!canProceed()}
        >
          {currentStep < 2 ? "Continuar" : "Proximo"}
        </Button>
      )}
    </form>
  )
}
