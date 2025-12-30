import { z } from "zod"

/**
 * Schemas Zod para validação de dados do formulário
 */

// Schema para instrumentos
export const instrumentosSchema = z.record(z.string(), z.number().int().min(0).max(999)).default({})

// Schema para ministério
export const ministerioSchema = z.record(z.string(), z.number().int().min(0).max(999)).default({})

// Schema para irmandade
export const irmandadeSchema = z.object({
  irmas: z.number().int().min(0).max(9999).default(0),
  irmaos: z.number().int().min(0).max(9999).default(0),
})

// Schema para complementos
export const complementosSchema = z.object({
  hinos: z.array(z.string().max(255)).default([]),
  coros: z.array(z.string().max(255)).default([]),
  visitas: z.array(z.string().max(255)).default([]),
})

// Schema completo para FormDataType
export const formDataSchema = z.object({
  localidade: z.string().min(1, "Localidade é obrigatória").max(100, "Localidade não pode exceder 100 caracteres"),
  eventoData: z
    .string()
    .refine((date) => {
      const d = new Date(date)
      return d instanceof Date && !isNaN(d.getTime())
    }, "Data do evento é inválida"),
  eventoHorario: z.string().min(1, "Horário do evento é obrigatório"),
  tipoEvento: z.string().min(1, "Tipo de evento é obrigatório"),
  atendimentoPresidencia: z.string().max(100, "Presidência não pode exceder 100 caracteres").optional().default(""),
  atendimentoRegencia: z.string().max(100, "Regência não pode exceder 100 caracteres").optional().default(""),
  instrumentos: instrumentosSchema,
  organistas: z.number().int().min(0).max(999).default(0),
  ministerio: ministerioSchema,
  irmandade: irmandadeSchema,
  complementos: complementosSchema,
})

// Schema específico para validação antes de gerar PDF
export const pdfGenerationSchema = formDataSchema
  .refine(
    (data) => {
      const total =
        Object.values(data.instrumentos).reduce((a, b) => a + (b || 0), 0) + (data.organistas || 0)
      return total <= 26973
    },
    {
      message: "Total de músicos não pode exceder 26973",
      path: ["instrumentos"],
    },
  )
  .refine(
    (data) => {
      const total = Object.values(data.ministerio).reduce((a, b) => a + (b || 0), 0)
      return total <= 6993
    },
    {
      message: "Total de ministério não pode exceder 6993",
      path: ["ministerio"],
    },
  )
  .refine(
    (data) => {
      const total = data.irmandade.irmas + data.irmandade.irmaos
      return total <= 19998
    },
    {
      message: "Total de irmandade não pode exceder 19998",
      path: ["irmandade"],
    },
  )

export type FormDataType = z.infer<typeof formDataSchema>
export type ValidationResult = {
  success: boolean
  data?: FormDataType
  errors: Record<string, string[]>
}

/**
 * Valida dados do formulário antes de gerar PDF
 */
export function validatePDFData(data: unknown): ValidationResult {
  const result = pdfGenerationSchema.safeParse(data)

  if (!result.success) {
    const errors: Record<string, string[]> = {}

    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".")
      if (!errors[path]) {
        errors[path] = []
      }
      errors[path].push(issue.message)
    })

    return {
      success: false,
      errors,
    }
  }

  return {
    success: true,
    data: result.data,
    errors: {},
  }
}

/**
 * Valida dados do formulário e retorna um array de mensagens de erro
 */
export function validatePDFDataAsArray(data: unknown): { valid: boolean; errors: string[] } {
  const result = pdfGenerationSchema.safeParse(data)

  if (!result.success) {
    const errors = result.error.issues.map((issue) => {
      const path = issue.path.length > 0 ? `${issue.path.join(".")}` : "dados"
      return `${path}: ${issue.message}`
    })

    return {
      valid: false,
      errors,
    }
  }

  return {
    valid: true,
    errors: [],
  }
}
