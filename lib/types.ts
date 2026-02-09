
export type FormDataType = {
  instrumentos: MusiciansInfo["instrumentos"]
  organistas: MusiciansInfo["organistas"]
  ministerio: ComparecimentoInfo["ministerio"]
  irmandade: ComparecimentoInfo["irmandade"]
  complementos: ComplementosInfo["complementos"]
  localidade: GeneralInfo["localidade"]
  eventoData: GeneralInfo["eventoData"]
  eventoHorario: GeneralInfo["eventoHorario"]
  tipoEvento: GeneralInfo["tipoEvento"]
  atendimentoPresidencia: GeneralInfo["atendimentoPresidencia"]
  atendimentoRegencia: GeneralInfo["atendimentoRegencia"]
}
export type MusiciansInfo = {
  instrumentos: { [key: string]: number }
  organistas: number
}



export type ComplementosInfo = {
  complementos: {
    hinos: string[]
    coros: string[]
    visitas: string[]
  }
}


export type ComparecimentoInfo = {
  ministerio: { [key: string]: number }
  irmandade: {
    irmas: number
    irmaos: number
  }
}


export type GeneralInfo = {
  localidade: string
  eventoData: string
  eventoHorario: string
  tipoEvento: string
  atendimentoPresidencia: string
  atendimentoRegencia: string
}

import type { STEP_ORDER } from "./constants"

export type FormStep = (typeof STEP_ORDER)[number]

export type SetMusiciansInfo = React.Dispatch<React.SetStateAction<MusiciansInfo>>

export type SetComplementosInfo = React.Dispatch<React.SetStateAction<ComplementosInfo>>

export type SetComparecimentoInfo = React.Dispatch<React.SetStateAction<ComparecimentoInfo>>

export type SetGeneralInfo = React.Dispatch<React.SetStateAction<GeneralInfo>>

export type SetFormDataType = React.Dispatch<React.SetStateAction<FormDataType>>

export type EventType = {
  id: string
  label: string
}[]
