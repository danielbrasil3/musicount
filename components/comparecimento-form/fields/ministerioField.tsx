
{/* UI COMPONENTS */}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

{/* ICONS */}
import { Plus, Minus, Users } from "lucide-react"

{/* CONSTANTS */}
import { ministerioTypes } from "@/lib/constants"

{/* HOOKS */}
import { useState, useCallback } from "react"

import { validateNumber } from "@/lib/validation"


interface MinisterioFieldProps {
  ministerio: Record<string, number>
  increment: (type: string) => void
  decrement: (type: string) => void
  updateMinisterio: (type: string, value: number) => void
}

export function MinisterioField({ ministerio, increment, decrement, updateMinisterio }: MinisterioFieldProps) {

  const handleInputChange = useCallback(
    (type: string, value: string) => {
      updateMinisterio(type, validateNumber(value, 0, 999))
    },
    [updateMinisterio],
  )

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Users className="h-5 w-5" />
            Ministério
          </CardTitle>
          <CardDescription>Registre a presença do ministério</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {ministerioTypes.map((tipo) => (
            <div
              key={tipo.id}
              className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30 hover:border-border/60 transition-all duration-200"
            >
              <span className="text-sm font-medium">{tipo.label}</span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-transparent"
                  onClick={() => decrement(tipo.id)}
                  disabled={(ministerio[tipo.id] || 0) === 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={ministerio[tipo.id] || 0}
                  onChange={(e) => handleInputChange(tipo.id, e.target.value)}
                  min="0"
                  max="999"
                  className="w-16 h-8 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&]:appearance-none"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-transparent"
                  onClick={() => increment(tipo.id)}
                  disabled={ministerio[tipo.id] === 999}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
  )
}