{
  /* UI COMPONENTS */
}
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useState, useEffect, useCallback } from "react";

{
  /* ICONS */
}
import { Users, Plus, X } from "lucide-react";

{
  /* CONSTANTS */
}
import { MAX_NAME_LENGTH } from "@/lib/validation";

{
  /* HOOKS */
}
import { useFormFields } from "@/hooks/useFormFields";
import { useAttendance } from "@/hooks/useAttendance";

{
  /* TYPES */
}
import type { SetGeneralInfo } from "@/lib/types";

interface AttendanceFieldProps {
  atendimentoPresidencia: string;
  atendimentoRegencia: string[];
  setFormData: SetGeneralInfo;
}

export const AttendanceField = memo(function AttendanceField({
  setFormData,
  atendimentoPresidencia,
  atendimentoRegencia,
}: AttendanceFieldProps) {
  const { createInputChangeHandler } = useFormFields(setFormData);
  const { items, add, remove } = useAttendance(atendimentoRegencia, setFormData)

  const [regenteInput, setRegenteInput] = useState("")

  const handleAdd = useCallback(() => {
    const value = regenteInput.trim()
    if (!value) return
    const normalized = value.charAt(0).toUpperCase() + value.substring(1).toLowerCase()
    add(normalized)
    setRegenteInput("")
  }, [regenteInput, add])

  const onRemove = useCallback(
    (index: number) => remove(index),
    [remove],
  )

  const handleRegenciaKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault()
        handleAdd()
      }
    },
    [handleAdd],
  )
  
  const handlePresidenciaKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
    }
  }, [])
  return (
    <Card className="transition-all duration-700">
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Atendimento</h2>
        </div>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="presidencia" className="text-sm font-medium">
              Presidência
            </Label>
              <Input
                id="presidencia"
                placeholder="Digite o nome do irmão da presidência"
                value={atendimentoPresidencia}
                onChange={createInputChangeHandler("atendimentoPresidencia")}
                onKeyDown={handlePresidenciaKeyDown}
                maxLength={MAX_NAME_LENGTH}
                className="h-12 text-base"
                autoFocus
              />
          </div>

          <div className="space-y-2">
            <Label htmlFor="regencia" className="text-sm font-medium">
              Regência
            </Label>
            <div className="flex gap-2">
              <Input
                id="regencia"
                placeholder="Digite o nome do irmão na regência"
                value={regenteInput}
                onChange={(e) => setRegenteInput(e.target.value)}
                onKeyDown={handleRegenciaKeyDown}
                maxLength={MAX_NAME_LENGTH}
                className="h-12 text-base"
                autoFocus
              />
              <Button
                type="button"
                onClick={() => handleAdd()}
                size="icon"
                className="h-11 w-11 shrink-0"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            {items.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-background/50 border border-border/50">
                {items.map((regente, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="pl-3 pr-1 py-1.5 text-sm gap-1"
                  >
                    {regente}
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
        </div>
      </CardContent>
    </Card>
  );
});
