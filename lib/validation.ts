/**
 * Validação de comprimento de string
 */
export const MAX_STRING_LENGTH = 255
export const MAX_LOCALIDADE_LENGTH = 100
export const MAX_NAME_LENGTH = 100

export function validateString(value: string, maxLength: number = MAX_STRING_LENGTH): string {
  if (typeof value !== "string") return ""
  return value.slice(0, maxLength)
}

/**
 * Validação de número com limite
 * 
 * Função unificada para validação de todos os inputs numéricos do sistema.
 * Aceita tanto strings quanto números, retornando sempre um número validado.
 * 
 * @param value - String ou número a ser validado
 * @param min - Valor mínimo permitido (padrão: 0)
 * @param max - Valor máximo permitido (padrão: 9999)
 * @returns Número validado dentro do intervalo [min, max]
 * 
 * Exemplos:
 * - validateNumber("") → 0
 * - validateNumber("150") → 150
 * - validateNumber("10000", 0, 9999) → 9999
 * - validateNumber(NaN) → 0
 */
export function validateNumber(value: number | string, min: number = 0, max: number = 999): number {
  let num: number
  
  if (typeof value === "string") {
    if (value === "") return 0
    num = Number(value)
    if (Number.isNaN(num)) return 0
  } else {
    num = typeof value === "number" ? value : 0
  }
  
  return Math.max(min, Math.min(max, num))
}

/**
 * Validação de data
 */
export function validateDate(dateString: string): boolean {
  if (!dateString) return false
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date.getTime())
}

/**
 * Formata data para exibição
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    if (!validateDate(dateString)) return "Data inválida"
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  } catch {
    return "Data inválida"
  }
}

/**
 * Sanitiza string para PDF (remove caracteres problemáticos)
 */
export function sanitizeForPDF(text: string): string {
  if (typeof text !== "string") return ""
  return text
    .replace(/[\x00-\x1F\x7F]/g, "") // Remove caracteres de controle
    .slice(0, MAX_STRING_LENGTH)
    .trim()
}

/**
 * Valida formulário antes de gerar PDF
 */
export function validateFormData(formData: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Validação de campos obrigatórios
  if (!formData.localidade?.trim()) {
    errors.push("Localidade é obrigatória")
  }
  if (!formData.tipoEvento) {
    errors.push("Tipo de evento é obrigatório")
  }
  if (!validateDate(formData.eventoData)) {
    errors.push("Data do evento é inválida")
  }
  if (!formData.eventoHorario) {
    errors.push("Horário do evento é obrigatório")
  }

  // Validação de comprimento
  if (formData.localidade?.length > MAX_LOCALIDADE_LENGTH) {
    errors.push(`Localidade não pode exceder ${MAX_LOCALIDADE_LENGTH} caracteres`)
  }
  if (formData.atendimentoPresidencia?.length > MAX_NAME_LENGTH) {
    errors.push(`Presidência não pode exceder ${MAX_NAME_LENGTH} caracteres`)
  }
  if (formData.atendimentoRegencia?.length > MAX_NAME_LENGTH) {
    errors.push(`Regência não pode exceder ${MAX_NAME_LENGTH} caracteres`)
  }

  // Validação de números
  const totalMusicos =
    (Object.values(formData.instrumentos || {}) as number[]).reduce((a: number, b: number) => a + (b || 0), 0) +
    (formData.organistas || 0)
  if (totalMusicos > 999) {
    errors.push("Total de músicos não pode exceder 999")
  }

  const totalMinisterio = (Object.values(formData.ministerio || {}) as number[]).reduce(
    (a: number, b: number) => a + (b || 0),
    0,
  )
  if (totalMinisterio > 999) {
    errors.push("Total de ministério não pode exceder 999")
  }

  const totalIrmandade = (formData.irmandade?.irmas || 0) + (formData.irmandade?.irmaos || 0)
  if (totalIrmandade > 999) {
    errors.push("Total de irmandade não pode exceder 999")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Divide array em chunks sem alterar original
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}
