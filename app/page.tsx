"use client"
import * as React from "react"
{/*UI COMPONENTS*/}
import { GeralForm } from "@/components/general-form"
import { MusiciansForm } from "@/components/musicians"
import { ComplementosForm } from "@/components/complementos-form"
import { Button } from "@/components/ui/button"
import { Music, ArrowBigLeftDash } from "lucide-react"
import { ComparecimentoForm } from "@/components/comparecimento-form"
import { PreviewField } from "@/components/previewContainer"
import type { FormStep } from "@/lib/types"
import { STEP_ORDER } from "@/lib/constants"


{/*HOOKS*/}
import { usePersistedForm } from "@/hooks/usePersistedForm"

export default function Home() {
  const [currentFormStep, setCurrentFormStep] = React.useState<FormStep>("geral")
  const [generalStep, setGeneralStep] = React.useState(0)
  const {formData, setFormData, resetForm} = usePersistedForm()


  const currentStepIndex = STEP_ORDER.indexOf(currentFormStep)

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < STEP_ORDER.length) {
      setCurrentFormStep(STEP_ORDER[nextIndex])
    }
  }

  const goToPreviousStep = () => {
    if (currentFormStep === "geral" && generalStep > 0) {
      setGeneralStep((s) => s - 1)
    } else if (currentStepIndex > 0) {
      setCurrentFormStep(STEP_ORDER[currentStepIndex - 1])
    }
  }

  const goToInitialStep = () => {
    resetForm()
    setCurrentFormStep("geral")
    setGeneralStep(0)
  }

  function handleNextFromGeneral(e: React.FormEvent) {
    e.preventDefault()
    if (generalStep < 2) {
      setGeneralStep((s) => s + 1)
    } else {
      goToNextStep()
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <Music className="w-8 h-8 text-primary " />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground" style={{ contentVisibility: "auto" }}>Controle de Ensaios</h1>
              <p className="text-sm text-muted-foreground">Registre as informações do ensaio musical</p>
            </div>
          </div>
        </div>

        {currentFormStep === "geral" && (
          <GeralForm
            formData={formData}
            setFormData={setFormData}
            currentStep={generalStep}
            onNext={handleNextFromGeneral}
            onReset={goToInitialStep}
          />
        )}

        {currentFormStep === "musicians" && (
          <div className="space-y-4">
            <MusiciansForm formData={formData} setFormData={setFormData} />

            <div className="flex items-center mt-4">
              <Button
                onClick={goToPreviousStep}
                variant="outline"
                className="flex-1 max-w-26 border-zinc-700 text-zinc-100 hover:bg-zinc-800"
              >
                <ArrowBigLeftDash className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button className="ml-2" onClick={goToNextStep}>
                Próximo
              </Button>
            </div>
          </div>
        )}

        {currentFormStep === "comparecimento" && (
          <div className="space-y-4">
            <ComparecimentoForm formData={formData} setFormData={setFormData} />

            <div className="flex items-center mt-4">
              <Button
                onClick={goToPreviousStep}
                variant="outline"
                className="flex-1 max-w-26 border-zinc-700 text-zinc-100 hover:bg-zinc-800"
              >
                <ArrowBigLeftDash className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button className="ml-2" onClick={goToNextStep}>
                Próximo
              </Button>
            </div>
          </div>
        )}

        {currentFormStep === "complementos" && (
          <div className="space-y-4">
            <ComplementosForm formData={formData} setFormData={setFormData} />

            <div className="flex items-center mt-4">
              <Button
                onClick={goToPreviousStep}
                variant="outline"
                className="flex-1 max-w-26 border-zinc-700 text-zinc-100 hover:bg-zinc-800"
              >
                <ArrowBigLeftDash className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button className="ml-auto" onClick={goToNextStep}>
                Concluir
              </Button>
            </div>
          </div>
        )}

        {currentFormStep === "preview" && (
          <div className="space-y-4">

            <div className="flex items-center mt-4">
              <Button
                onClick={goToPreviousStep}
                variant="outline"
                className="flex-1 max-w-26 border-zinc-700 text-zinc-100 hover:bg-zinc-800"
              >
                <ArrowBigLeftDash className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </div>
            <PreviewField formData={formData} onReset={goToInitialStep} />
          </div>
        )}
      </div>
    </main>
  )
}
