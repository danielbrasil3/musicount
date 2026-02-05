


import { Button } from "@/components/ui/button"
import { ArrowBigLeftDash } from "lucide-react"


interface previousnextButtonprops{
  onClickNext: () => void
  onClickPrevious: () => void
  currentFormStep: string
}


export default function PreviousNextButton({onClickNext, onClickPrevious, currentFormStep}: previousnextButtonprops) {
  const currentStep = (currentFormStep === "complementos")

  return (
    <div className="flex items-center mt-4">
      <Button
        onClick={onClickPrevious}
        variant="outline"
        className="flex-1 max-w-26 border-zinc-700 text-zinc-100 hover:bg-zinc-800"
      >
        <ArrowBigLeftDash className="w-4 h-4 mr-2" />
          Voltar
      </Button>
      {currentFormStep !== "preview" && (
        <Button className="ml-2" onClick={onClickNext}>
          {currentStep ? "Concluir" : "Próximo"}
        </Button>
      )}
    </div>
  )
}