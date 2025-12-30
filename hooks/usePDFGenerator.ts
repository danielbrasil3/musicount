import { useCallback } from "react"
import type { FormDataType } from "@/lib/types"
import { eventTypes, instruments, ministerioTypes } from "@/lib/constants"
import { jsPDF } from "jspdf"
import { sanitizeForPDF, formatDate, validateDate, chunkArray } from "@/lib/validation"
import { validatePDFDataAsArray } from "@/lib/schemas"
import { poppinsRegular, poppinsBold } from "@/assets/fonts/poppins"

export function usePDFGenerator(formData: FormDataType) {

  async function imageToBase64(url: string): Promise<string> {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Erro ao carregar imagem: ${res.status}`);
    }

    const blob = await res.blob();

    if (!blob.type.startsWith("image/")) {
      throw new Error("Arquivo retornado não é imagem");
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

  const getTipoEventoLabel = useCallback(
    (id: string) => {
      return eventTypes.find((e) => e.id === id)?.label || id
    },
    [],
  )

  const getInstrumentLabel = useCallback(
    (id: string) => {
      return instruments.find((i) => i.id === id)?.label || id
    },
    [],
  )

  const getMinisterioLabel = useCallback(
    (id: string) => {
      return ministerioTypes.find((m) => m.id === id)?.label || id
    },
    [],
  )

  const generatePDFWithBlob = useCallback(async (): Promise<Blob | null> => {
    try {
      // Validação com Zod antes de gerar PDF
      const validation = validatePDFDataAsArray(formData)
      if (!validation.valid) {
        const errorMessage = validation.errors.join("\n")
        console.error("Erro de validação:", errorMessage)
        throw new Error(`Validação falhou:\n${errorMessage}`)
      }

      const doc = new jsPDF()
      doc.addFileToVFS("Poppins-Regular.ttf", poppinsRegular)
      doc.addFont("Poppins-Regular.ttf", "Poppins", "normal")
      doc.addFileToVFS("Poppins-Bold.ttf", poppinsBold)
      doc.addFont("Poppins-Bold.ttf", "Poppins", "bold")

      const bgBase64 = await imageToBase64("/ENSAIO.jpg");

      doc.addImage(bgBase64, "PNG", 0, 0, 210, 297);

      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const colWidth = (pageWidth - 20) / 2
      const margin = 8
      const colGap = 5
      let yPosition = 20

    doc.setTextColor(100, 116, 139)
    doc.setFont("Poppins", "normal")
    doc.setFontSize(6)
    doc.text("Sistema de Controle de Ensaios Musicais", 31, 5, { align: "center" })
    doc.text(
      `Gerado em ${new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })} às ${new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      pageWidth / 2 + 50,
      5,
      { align: "left" },
    )

    yPosition = 12
    doc.setTextColor(0, 0, 0)

    // Funções auxiliares
    const createSectionHeader = (title: string, y: number, width: number, x: number = 10) => {
      doc.setFillColor(241, 245, 249)
      doc.rect(x, y - 6, width, 10, "F")
      doc.setFillColor(37, 99, 235)
      doc.rect(x, y - 6, 4, 10, "F")
      doc.setFontSize(11)
      doc.setFont("Poppins", "normal")
      doc.setTextColor(30, 41, 59)
      doc.text(title, x + 8, y)
      doc.setTextColor(0, 0, 0)
      return y + 10
    }

    const addDataRow = (label: string, value: string, y: number, width: number, x: number = 10, isTotal = false) => {
      doc.setFontSize(8)

      if (isTotal) {
        doc.setFillColor(219, 234, 254)
        doc.rect(x + 4, y - 5, width - 3, 8, "F")
        doc.setFont("Poppins", "bold")
        doc.setTextColor(30, 64, 175)
      } else {
        doc.setFont("Poppins", "normal")
        doc.setTextColor(71, 85, 105)
      }

      doc.text(sanitizeForPDF(label), x + 8, y)
      doc.setFont("Poppins", isTotal ? "bold" : "bold")
      doc.setTextColor(isTotal ? 30 : 15, isTotal ? 64 : 23, isTotal ? 175 : 42)
      doc.text(sanitizeForPDF(value), x + width - 2, y, { align: "right" })

      if (!isTotal) {
        doc.setDrawColor(226, 232, 240)
        doc.setLineWidth(0.1)
        doc.line(x + 8, y + 2, x + width, y + 2)
      }

      return y + 6
    }

    // SEÇÃO 1: INFORMAÇÕES GERAIS (full width)
    yPosition = createSectionHeader("INFORMAÇÕES GERAIS", yPosition, pageWidth - 15, margin)
    yPosition = addDataRow("Localidade", sanitizeForPDF(formData.localidade), yPosition, pageWidth - 12, margin - 4)
    yPosition = addDataRow("Tipo de Evento", getTipoEventoLabel(formData.tipoEvento), yPosition, pageWidth - 12, margin - 4)
    yPosition = addDataRow(
      "Data",
      formatDate(formData.eventoData),
      yPosition,
      pageWidth - 12,
      margin - 4,
    )
    yPosition = addDataRow("Horário", formData.eventoHorario, yPosition, pageWidth - 12, margin - 4)
    yPosition = addDataRow("Atendimento Presidência", sanitizeForPDF(formData.atendimentoPresidencia || "Não informado"), yPosition, pageWidth - 12, margin - 4)
    yPosition = addDataRow("Atendimento Regência", sanitizeForPDF(formData.atendimentoRegencia || "Não informado"), yPosition, pageWidth - 12, margin - 4)
    yPosition += 6

    // Layout 2 colunas começa aqui
    let leftY = yPosition
    let rightY = yPosition

    // COLUNA ESQUERDA: MÚSICOS
    leftY = createSectionHeader("MÚSICOS", leftY, colWidth, margin)

    const instrumentosCount = Object.entries(formData.instrumentos).filter(([, count]) => count > 0)
    if (instrumentosCount.length > 0) {
      doc.setFontSize(10)
      doc.setFont("Poppins", "bold")
      doc.setTextColor(71, 85, 105)
      doc.text("Detalhamento:", margin + 2, leftY)
      leftY += 6

      // Calcular total de instrumentos
      const totalInstrumentosPDF = instrumentosCount.reduce((sum, [, count]) => sum + count, 0)

      // Agrupar instrumentos por categoria
      const categorias = ["cordas", "madeiras", "metais", "outros"]
      const categoryLabels: { [key: string]: string } = {
        cordas: "Cordas",
        madeiras: "Madeiras",
        metais: "Metais",
        outros: "Outros",
      }

      categorias.forEach((categoria) => {
        const instrumentosCategoria = instrumentosCount.filter(([key]) => {
          return instruments.find((i) => i.id === key)?.category === categoria
        })

        if (instrumentosCategoria.length > 0) {
          // Calcular total da categoria
          const totalCategoria = instrumentosCategoria.reduce((sum, [, count]) => sum + count, 0)
          const percentualCategoria = ((totalCategoria / totalInstrumentosPDF) * 100).toFixed(0)

          // Header da categoria com porcentagem
          doc.setFillColor(243, 244, 246)
          doc.rect(margin + 4, leftY - 4, colWidth - 6, 7, "F")
          doc.setFontSize(8)
          doc.setFont("Poppins", "bold")
          doc.setTextColor(55, 65, 81)
          doc.text(`${categoryLabels[categoria]} ${percentualCategoria}%`, margin + 6, leftY)
          doc.setFont("Poppins", "bold")
          doc.setTextColor(55, 65, 81)
          doc.text(totalCategoria.toString(), margin + colWidth - 4, leftY, { align: "right" })
          leftY += 7


          // Instrumentos da categoria
          instrumentosCategoria.forEach(([key, count]) => {
            const percentualInstrumento = ((count / totalInstrumentosPDF) * 100).toFixed(0)
            leftY = addDataRow(`${getInstrumentLabel(key)} ${percentualInstrumento}%`, count.toString(), leftY, colWidth + 2, margin - 4)
          })

          leftY += 2
        }
      })
    }

    
    const totalInstrumentos = Object.values(formData.instrumentos).reduce((a, b) => a + b, 0)
    doc.setFillColor(239, 246, 255)
    doc.roundedRect(margin + 2, leftY - 3, (colWidth - 9) / 2, 12, 1, 1, "F")
    doc.setFontSize(8)
    doc.setFont("Poppins", "normal")
    doc.setTextColor(37, 99, 235)
    doc.text("Musicos", margin + 4, leftY + 1)
    doc.setFontSize(14)
    doc.setFont("Poppins", "bold")
    doc.text(totalInstrumentos.toString(), margin + 4, leftY + 7)

    doc.setFillColor(254, 243, 199)
    doc.roundedRect(margin + (colWidth / 2) + 2, leftY - 3, (colWidth - 6) / 2, 12, 1, 1, "F")
    doc.setTextColor(120, 53, 15)
    doc.setFontSize(8)
    doc.setFont("Poppins", "normal")
    doc.text("Organistas", margin + (colWidth / 2) + 4, leftY + 1)
    doc.setFontSize(14)
    doc.setFont("Poppins", "bold")
    doc.text(formData.organistas.toString(), margin + (colWidth / 2) + 4, leftY + 7)

    leftY += 16

    const totalMusicos = formData.organistas + totalInstrumentos
    leftY += 1
    leftY = addDataRow("TOTAL GERAL", totalMusicos.toString(), leftY, colWidth, margin - 2, true)
    leftY += 8

    // COLUNA DIREITA: MINISTÉRIO E IRMANDADE (topo)
    rightY = createSectionHeader("MINISTÉRIO E IRMANDADE", rightY, colWidth, margin + colWidth + colGap)

    const ministerioCount = Object.entries(formData.ministerio).filter(([, count]) => count > 0)
    if (ministerioCount.length > 0) {
      doc.setFontSize(10)
      doc.setFont("Poppins", "bold")
      doc.setTextColor(71, 85, 105)
      doc.text("Ministério:", margin + colWidth + colGap + 4, rightY)
      rightY += 6

      ministerioCount.forEach(([key, count]) => {
        rightY = addDataRow(getMinisterioLabel(key), count.toString(), rightY, colWidth, margin + colWidth + colGap - 2)
      })
      rightY += 2
    }

    doc.setFontSize(10)
    doc.setFont("Poppins", "bold")
    doc.setTextColor(71, 85, 105)
    doc.text("Irmandade:", margin + colWidth + colGap + 4, rightY)
    rightY += 6

    rightY = addDataRow("Irmãs", formData.irmandade.irmas.toString(), rightY, colWidth, margin + colWidth + colGap - 2)
    rightY = addDataRow("Irmãos", formData.irmandade.irmaos.toString(), rightY, colWidth, margin + colWidth + colGap - 2)

    const totalMinisterio = Object.values(formData.ministerio).reduce((a, b) => a + b, 0)
    const totalIrmandade = formData.irmandade.irmas + formData.irmandade.irmaos
    rightY += 4
    rightY = addDataRow("TOTAL", (totalMinisterio + totalIrmandade).toString(), rightY, colWidth, margin + colWidth + colGap - 2, true)
    rightY += 7

    // COLUNA DIREITA: COMPLEMENTOS (embaixo)
    rightY = createSectionHeader("COMPLEMENTOS", rightY, colWidth, margin + colWidth + colGap)

    if (formData.complementos.hinos.length > 0) {
      doc.setFontSize(10)
      doc.setFont("Poppins", "bold")
      doc.setTextColor(71, 85, 105)
      doc.text("Hinos:", margin + colWidth + colGap + 4, rightY)
      rightY += 5

      doc.setFont("Poppins", "normal")
      doc.setTextColor(15, 23, 42)
      doc.setFontSize(8)

      // Quebra de linha usando chunkArray para não alterar array original
      const hinosChunks = chunkArray(formData.complementos.hinos, 12)
      hinosChunks.forEach((chunk) => {
        const text = chunk.map(sanitizeForPDF).join(" | ")
        doc.text(text, margin + colWidth + colGap + 6, rightY)
        rightY += 4
      })
      rightY += 2
    }

    if (formData.complementos.coros.length > 0) {
      doc.setFontSize(10)
      doc.setFont("Poppins", "bold")
      doc.setTextColor(71, 85, 105)
      doc.text("Coros:", margin + colWidth + colGap + 4, rightY)
      rightY += 5

      doc.setFont("Poppins", "normal")
      doc.setTextColor(15, 23, 42)
      doc.setFontSize(8)
      
      const corosChunks = chunkArray(formData.complementos.coros, 10)
      corosChunks.forEach((chunk) => {
        const text = chunk.map(sanitizeForPDF).join(" | ")
        doc.text(text, margin + colWidth + colGap + 6, rightY)
        rightY += 4
      })
      rightY += 2
    }

    if (formData.complementos.visitas.length > 0) {
      doc.setFontSize(10)
      doc.setFont("Poppins", "bold")
      doc.setTextColor(71, 85, 105)
      doc.text("Visitas:", margin + colWidth + colGap + 4, rightY)
      rightY += 5

      doc.setFont("Poppins", "normal")
      doc.setTextColor(15, 23, 42)
      doc.setFontSize(8)
      
      const visitasChunks = chunkArray(formData.complementos.visitas, 1)
      visitasChunks.forEach((chunk) => {
        const text = chunk.map(sanitizeForPDF)
        doc.text(text, margin + colWidth + colGap + 6, rightY)
        rightY += 4
      })
      rightY += 2
    }

    // Gerar Blob em vez de salvar diretamente
    return doc.output("blob") as Blob
    } catch (error) {
      console.error("Erro ao gerar PDF:", error)
      return null
    }
  }, [formData, getTipoEventoLabel, getInstrumentLabel, getMinisterioLabel])

  return {
    generatePDFWithBlob,
    getTipoEventoLabel,
    getInstrumentLabel,
    getMinisterioLabel,
  }
}
