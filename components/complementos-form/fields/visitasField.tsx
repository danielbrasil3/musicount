{/* UI COMPONENTS */}
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

{/* ICONS */}
import { Users2, Plus, X } from "lucide-react"

{/* HOOKS */}
import { useState, useCallback } from "react"

type VisitasFieldProps = {
  onAdd: (value: string) => void
  onRemove: (index: number) => void
  items: string[]
}

export function VisitasField({ onAdd, onRemove, items }: VisitasFieldProps) {
  const [nomeInput, setNomeInput] = useState("")
  const [localidadeInput, setLocalidadeInput] = useState("")
  const [diaInput, setDiaInput] = useState("")

  const handleAdd = useCallback(() => {
    if (nomeInput.trim() && localidadeInput.trim() && diaInput.trim()) {
      const nomeCapitalizado = nomeInput.charAt(0).toUpperCase() + nomeInput.substring(1).toLowerCase()

      const visitaCompleta = `${nomeCapitalizado} - ${localidadeInput} - ${diaInput}`
      onAdd(visitaCompleta)
      setNomeInput("")
      setLocalidadeInput("")
      setDiaInput("")
    }
  }, [nomeInput, localidadeInput, diaInput, onAdd])

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault()
        handleAdd()
      }
    },
    [handleAdd],
  )

  return (
    <div className="space-y-3">
      <Label htmlFor="visitas" className="text-sm font-medium flex items-center gap-2">
        <Users2 className="h-4 w-4 text-muted-foreground" />
        Visitas
      </Label>
      <div className="space-y-2">
        <Label htmlFor="nome-visita" className="text-sm font-medium">
          Nome do Visitante
        </Label>
        <Input
          id="nome-visita"
          placeholder="Ex: João"
          value={nomeInput}
          onChange={(e) => setNomeInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="localidade-visita" className="text-sm font-medium">
          Localidade do Visitante
        </Label>
        <Input
          id="localidade-visita"
          placeholder="Ex: Ribeiro de Abreu (Belo Horizonte - MG)"
          value={localidadeInput}
          onChange={(e) => setLocalidadeInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dia-ensaio-visita" className="text-sm font-medium">
          Dia de Ensaio
        </Label>
        <Input
          id="dia-ensaio-visita"
          placeholder="Ex: 2° Terça-feira"
          value={diaInput}
          onChange={(e) => setDiaInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
        />
      </div>
      <Button type="button" onClick={handleAdd} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Visita
      </Button>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-background/50 border border-border/50">
          {items.map((visita, index) => (
            <Badge key={index} variant="secondary" className="pl-3 pr-1 py-1.5 text-sm gap-1">
              {visita}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-destructive/20"
                onClick={() => onRemove(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}