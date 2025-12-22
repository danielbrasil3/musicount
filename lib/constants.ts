import type { EventType } from "@/lib/types"

export const eventTypes: EventType = [
  { id: "ensaio-local", label: "Ensaio Local" },
  { id: "ensaio-regional", label: "Ensaio Regional" },
  { id: "pratica-gem", label: "Prática em Conjunto (GEM)" },
]

export const instruments = [
  { id: "violino", label: "Violino", category: "cordas" },
  { id: "viola", label: "Viola", category: "cordas" },
  { id: "violoncelo", label: "Violoncelo", category: "cordas" },
  { id: "flauta", label: "Flauta", category: "madeiras" },
  { id: "oboe", label: "Oboé", category: "madeiras" },
  { id: "oboe-damore", label: "Oboé D'Amore", category: "madeiras" },
  { id: "corne-ingles", label: "Corne Inglês", category: "madeiras" },
  { id: "fagote", label: "Fagote", category: "madeiras" },
  { id: "clarinete", label: "Clarinete", category: "madeiras" },
  { id: "clarinete-alto", label: "Clarinete Alto", category: "madeiras" },
  { id: "clarinete-baixo", label: "Clarinete Baixo", category: "madeiras" },
  { id: "sax-soprano", label: "Sax Soprano", category: "madeiras" },
  { id: "sax-alto", label: "Sax Alto", category: "madeiras" },
  { id: "sax-tenor", label: "Sax Tenor", category: "madeiras" },
  { id: "sax-baritono", label: "Sax Barítono", category: "madeiras" },
  { id: "trompete", label: "Trompete", category: "metais" },
  { id: "cornet", label: "Cornet", category: "metais" },
  { id: "flugelhorn", label: "Flugelhorn", category: "metais" },
  { id: "trompa", label: "Trompa", category: "metais" },
  { id: "trombonito", label: "Trombonito", category: "metais" },
  { id: "trombone", label: "Trombone", category: "metais" },
  { id: "baritono-vertical", label: "Barítono Vertical", category: "metais" },
  { id: "eufonio", label: "Eufônio", category: "metais" },
  { id: "tuba", label: "Tuba", category: "metais" },
  { id: "acordeon", label: "Acordeon", category: "outros" },
  { id: "sax-soprano-curvo", label: "Sax Soprano Curvo", category: "outros" },
]

export const categoryLabels: { [key: string]: string } = {
  cordas: "Cordas",
  madeiras: "Madeiras",
  metais: "Metais",
  outros: "Outros",
}