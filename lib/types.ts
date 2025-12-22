
export type FormDataType = {
  localidade: string
  eventoData: string
  eventoHorario: string
  tipoEvento: string
  atendimentoPresidencia: string
  atendimentoRegencia: string
  instrumentos: { [key: string]: number }
  organistas: number
}

export type SetFormDataType = React.Dispatch<React.SetStateAction<FormDataType>>

export type EventType = {
  id: string
  label: string
}[]
