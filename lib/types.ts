
export type FormDataType = {
  localidade: string
  eventoData: string
  eventoHorario: string
  tipoEvento: string
  atendimentoPresidencia: string
  atendimentoRegencia: string
  instrumentos: { [key: string]: number }
  organistas: number
  ministerio: { [key: string]: number }
  irmandade: {
    irmas: number
    irmaos: number
  }
  complementos: {
    hinos: string[]
    coros: string[]
    visitas: string[]
  }
}


import type { STEP_ORDER } from "./constants"

export type FormStep = (typeof STEP_ORDER)[number]

export type SetFormDataType = React.Dispatch<React.SetStateAction<FormDataType>>

export type EventType = {
  id: string
  label: string
}[]
