import { eventTypes, instruments, ministerioTypes } from "@/lib/constants"

export function getTipoEventoLabel(id: string) {
  return eventTypes.find((eventType) => eventType.id === id)?.label || id
}

export function getInstrumentLabel(id: string) {
  return instruments.find((instrument) => instrument.id === id)?.label || id
}

export function getMinisterioLabel(id: string) {
  return ministerioTypes.find((ministerioType) => ministerioType.id === id)?.label || id
}
