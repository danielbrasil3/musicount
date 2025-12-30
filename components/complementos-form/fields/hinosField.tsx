{/* UI COMPONENTS */}
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

{/* ICONS */}
import { Music, Plus, X } from "lucide-react"

{/* HOOKS */}
import { useState, useCallback } from "react"

type HinosFieldProps = {
  onAdd: (value: string) => void
  onRemove: (index: number) => void
  items: string[]
}

export function HinosField({ onAdd, onRemove, items }: HinosFieldProps) {
  const [hinoInput, setHinoInput] = useState("")

  const handleAdd = useCallback(() => {
    if (hinoInput.trim()) {
      onAdd(hinoInput)
      setHinoInput("")
    }
  }, [hinoInput, onAdd])

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault()
        handleAdd()
      }
      else if (e.key === ",") {
        e.preventDefault()
        handleAdd()
      }
    },
    [handleAdd],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (value === "" || (Number(value) >= 1 && Number(value) <= 480)) {
        setHinoInput(value)
      }
    },
    [setHinoInput],
  )

  return (
    <div className="space-y-3">
      <Label htmlFor="hinos" className="text-sm font-medium flex items-center gap-2">
        <Music className="h-4 w-4 text-muted-foreground" />
        Hinos
      </Label>
      <div className="flex gap-2">
        <Input
          id="hinos"
          placeholder="Ex: 416"
          type="number"
          value={hinoInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          min={1}
          max={480}
          className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
        />
        <Button type="button" onClick={handleAdd} size="icon" className="h-11 w-11 shrink-0">
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-background/50 border border-border/50">
          {items.map((hino, index) => (
            <Badge key={index} variant="secondary" className="pl-3 pr-1 py-1.5 text-sm gap-1">
              {hino}
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


