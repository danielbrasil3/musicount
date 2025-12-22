"use client"
import * as React from "react"

{/* UI COMPONENTS */}
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarPicker } from "@/components/ui/calendar"

{/* ICONS */}
import { Calendar as CalendarIcon } from "lucide-react"

{/* TYPES */}
import type { FormDataType } from "@/lib/types"
import type { SetFormDataType } from "@/lib/types"

{/* CONSTANTS */}
import { eventTypes } from "@/lib/constants"

export function EventTypeField({
  formData,
  setFormData,
  currentStep,
}: {
  formData: FormDataType
  setFormData: SetFormDataType
  currentStep: number
}) {
  const [date, setDate] = React.useState<Date | undefined>(
    formData.eventoData ? new Date(formData.eventoData) : undefined
  )

  React.useEffect(() => {
    if (date) {
      const iso = date.toISOString().split("T")[0]
      if (iso !== formData.eventoData) {
        setFormData({ ...formData, eventoData: iso })
      }
    } else if (formData.eventoData) {
      setFormData({ ...formData, eventoData: "" })
    }
  }, [date])
  return (
    <Card className="transition-all duration-700 animate-in fade-in slide-in-from-bottom-8">
      <CardContent className="space-y-3">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
            <CalendarIcon className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-base sm:text-lg font-semibold">Evento</h2>
        </div>

        {/* Tipo de Evento */}
        <div className="space-y-3 pt-2">
          <RadioGroup
            value={formData.tipoEvento}
            onValueChange={(value) =>
              setFormData({ ...formData, tipoEvento: value })
            }
            className=""
          >
            {eventTypes.map((eventType) => (
              <div
                key={eventType.id}
                className="flex items-center space-x-3 px-2.5 py-2 sm:px-3 rounded-lg border border-transparent hover:bg-accent/50 focus-within:border-primary/30 transition-all"
              >
                <RadioGroupItem value={eventType.id} id={eventType.id} />
                <Label
                  htmlFor={eventType.id}
                  className="text-sm font-normal cursor-pointer flex-1 min-h-8 flex items-center"
                >
                  {eventType.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Data e Horário */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="eventoData" className="text-sm font-medium">
              Data <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between h-12 sm:h-10 text-sm"
                >
                  <span className={date ? "" : "text-muted-foreground"}>
                    {date
                      ? date.toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "Selecionar data"}
                  </span>
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarPicker
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => setDate(selectedDate as Date | undefined)}
                  className="rounded-md border shadow-sm"
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventoHorario" className="text-sm font-medium">
              Horário <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.eventoHorario}
              onValueChange={(value) =>
                setFormData({ ...formData, eventoHorario: value })
              }
              
            >
              <SelectTrigger className="w-full min-h-12 sm:min-h-10 text-sm ">
                <SelectValue placeholder="Selecionar horário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="09:00">09:00</SelectItem>
                <SelectItem value="09:30">09:30</SelectItem>
                <SelectItem value="10:00">10:00</SelectItem>
                <SelectItem value="14:00">14:00</SelectItem>
                <SelectItem value="16:00">16:00</SelectItem>
                <SelectItem value="16:30">16:30</SelectItem>
                <SelectItem value="17:00">17:00</SelectItem>
                <SelectItem value="19:00">19:00</SelectItem>
                <SelectItem value="19:30">19:30</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}