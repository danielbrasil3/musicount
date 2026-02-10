"use client"
import * as React from "react"

{/*UI COMPONENTS*/}
import PreviousNextButton from "@/components/previousnextButton/Buttons"

{/*FORM COMPONENTS*/}
import GeneralForm from "@/components/general-form/GeneralForm"
import { MusiciansForm } from "@/components/musicians"
import ComparecimentoForm from "@/components/comparecimento-form/comparecimentoForm"
import ComplementosForm from "@/components/complementos-form/complementosForm"
import PreviewField from "@/components/previewContainer/previewField"

{/*ICONS*/}
import { Music } from "lucide-react"
{/*LIBS*/ }
import type { FormStep } from "@/lib/types"
import { STEP_ORDER } from "@/lib/constants"


export default function Home() {
  const [currentFormStep, setCurrentFormStep] = React.useState<FormStep>("geral")


  const currentStepIndex = STEP_ORDER.indexOf(currentFormStep)

  {/*Proximo passo*/}
  const goToNextStep = React.useCallback(() => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < STEP_ORDER.length) {
      setCurrentFormStep(STEP_ORDER[nextIndex])
    }
  }, [currentStepIndex])

  {/*Passo anterior*/}
  const goToPreviousStep = React.useCallback(() => {
    if (currentFormStep === "geral") {
      return
    } else if (currentStepIndex > 0) {
      setCurrentFormStep(STEP_ORDER[currentStepIndex - 1])
    }
  }, [currentFormStep, currentStepIndex])

  {/*Voltar ao inicio*/}
  const goToInitialStep = React.useCallback(() => {
    setCurrentFormStep("geral")
  }, [])


  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="container max-w-2xl mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Music className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Controle de Ensaios</h1>
                <p className="text-sm text-muted-foreground">Registre as informações do ensaio musical</p>
              </div>
            </div>
          </div>

          {/*Form Informaçoes Gerais*/}
          {currentFormStep === "geral" && (
            <GeneralForm
              onNext={goToNextStep}
              onReset={goToInitialStep}
            />
          )}

          {/*Form Musicos*/}
          {currentFormStep === "musicians" && (
            <div className="space-y-4">
              <MusiciansForm />
              <PreviousNextButton onClickNext={goToNextStep} onClickPrevious={goToPreviousStep} currentFormStep={currentFormStep}/>
            </div>
          )}

          {/*Form Comparecimento*/}
          {currentFormStep === "comparecimento" && (
            <div className="space-y-4">
              <ComparecimentoForm />
              <PreviousNextButton onClickNext={goToNextStep} onClickPrevious={goToPreviousStep} currentFormStep={currentFormStep}/>
            </div>
          )}

          {/*Form Complementos*/}
          {currentFormStep === "complementos" && (
            <div className="space-y-4">
              <ComplementosForm />
              <PreviousNextButton onClickNext={goToNextStep} onClickPrevious={goToPreviousStep} currentFormStep={currentFormStep}/>
            </div>
          )}

          {/*Preview Container*/}
          {currentFormStep === "preview" && (
            <div className="space-y-4">
              <PreviousNextButton onClickNext={goToNextStep} onClickPrevious={goToPreviousStep} currentFormStep={currentFormStep}/>
              <PreviewField  onReset={goToInitialStep} />
            </div>
          )}
        </div>
      </main>
    </>
  )
}
