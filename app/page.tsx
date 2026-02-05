"use client"
import * as React from "react"

{/*UI COMPONENTS*/}
import { Button } from "@/components/ui/button"

import PreviousNextButton from "@/components/previousnextButton/Buttons"

{/*FORM COMPONENTS*/}
import { GeralForm } from "@/components/general-form"
import { MusiciansForm } from "@/components/musicians"
import { ComparecimentoForm } from "@/components/comparecimento-form"
import { ComplementosForm } from "@/components/complementos-form"
import { PreviewField } from "@/components/previewContainer"

{/*ICONS*/}
import { Music, ArrowBigLeftDash } from "lucide-react"
{/*LIBS*/ }
import type { FormStep } from "@/lib/types"
import { STEP_ORDER } from "@/lib/constants"


{/*HOOKS*/}
import { usePersistedForm } from "@/hooks/usePersistedForm"

export default function Home() {
  const [currentFormStep, setCurrentFormStep] = React.useState<FormStep>("geral")
  const [generalStep, setGeneralStep] = React.useState(0)
  const {formData, setFormData, resetForm} = usePersistedForm()


  const currentStepIndex = STEP_ORDER.indexOf(currentFormStep)

  {/*Proximo passo*/}
  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < STEP_ORDER.length) {
      setCurrentFormStep(STEP_ORDER[nextIndex])
    }
  }

  {/*Passo anterior*/}
  const goToPreviousStep = () => {
    if (currentFormStep === "geral" && generalStep > 0) {
      setGeneralStep((s) => s - 1)
    } else if (currentStepIndex > 0) {
      setCurrentFormStep(STEP_ORDER[currentStepIndex - 1])
    }
  }

  {/*Voltar ao inicio*/}
  const goToInitialStep = () => {
    resetForm()
    setCurrentFormStep("geral")
    setGeneralStep(0)
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

        {/*Form Informaçoes Gerais*/}
        {currentFormStep === "geral" && (
          <GeralForm
            formData={formData}
            setFormData={setFormData}
            onNext={goToNextStep}
            onReset={goToInitialStep}
          />
        )}
        
        {/*Form Musicos*/}
        {currentFormStep === "musicians" && (
          <div className="space-y-4">
            <MusiciansForm formData={formData} setFormData={setFormData} />
            <PreviousNextButton onClickNext={goToNextStep} onClickPrevious={goToPreviousStep} currentFormStep={currentFormStep}/>
          </div>
        )}

        {/*Form Comparecimento*/}
        {currentFormStep === "comparecimento" && (
          <div className="space-y-4">
            <ComparecimentoForm formData={formData} setFormData={setFormData} />
            <PreviousNextButton onClickNext={goToNextStep} onClickPrevious={goToPreviousStep} currentFormStep={currentFormStep}/>
          </div>
        )}

        {/*Form Complementos*/}
        {currentFormStep === "complementos" && (
          <div className="space-y-4">
            <ComplementosForm formData={formData} setFormData={setFormData} />
            <PreviousNextButton onClickNext={goToNextStep} onClickPrevious={goToPreviousStep} currentFormStep={currentFormStep}/>
          </div>
        )}

        {/*Preview Container*/}
        {currentFormStep === "preview" && (
          <div className="space-y-4">
            <PreviousNextButton onClickNext={goToNextStep} onClickPrevious={goToPreviousStep} currentFormStep={currentFormStep}/>
            <PreviewField formData={formData} onReset={goToInitialStep} />
          </div>
        )}
      </div>
    </main>
  )
}
