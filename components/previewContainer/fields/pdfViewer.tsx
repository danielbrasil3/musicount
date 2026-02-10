
"use client"

{/* UI COMPONENTS */}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

{/* ICONS */}
import { FileText, Download, X } from "lucide-react"

interface PDFViewerProps {
  pdfUrl: string
  onClose: () => void
  eventDate?: string
  eventLocation?: string
  eventType?: string
}

export function PDFViewer({ pdfUrl, onClose, eventDate, eventLocation, eventType }: PDFViewerProps) {
  const handleDownloadPDF = async () => {
    try {
      const response = await fetch(pdfUrl)
      const blob = await response.blob()
      
      // Formatar a data para o padrão dd-mm-aaaa
      const dateParts = eventDate?.split("-") || [""]
      const formattedDate = dateParts.length === 3 
        ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
        : ""
      
      // Criar o nome do arquivo dinamicamente
      const fileName = `${eventType}-${formattedDate}-${eventLocation}.pdf`
      
      // Criar URL do blob e fazer download
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Erro ao baixar PDF:", error)
      // Fallback: abre o PDF em nova aba
      window.open(pdfUrl, '_blank')
    }
  }

  return (
    <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10">
            <FileText className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <CardTitle className="text-zinc-100">PDF Gerado com Sucesso</CardTitle>
            <CardDescription className="text-zinc-400">Visualize ou baixe o relatório abaixo</CardDescription>
          </div>
        </div>
        
      </CardHeader>
      <div className="flex gap-6 px-6">
        <Button
          onClick={handleDownloadPDF}
          className="flex-1 max-w-35 bg-blue-600 hover:bg-blue-700"
        >
          <Download className="w-4 h-4 mr-2" />
            Baixar PDF
        </Button>

        <Button
          onClick={onClose}
          variant="outline"
          className="flex-1 max-w-35 border-zinc-700 text-zinc-100 hover:bg-zinc-800"
        >
          <X className="w-4 h-4 mr-2" />
          Gerar outro
        </Button>
      </div>

      <CardContent className="px-6 py-2 max-w-105 m-auto aspect-210/297 overflow-hidden bg-white rounded-lg">
        <iframe
          src={pdfUrl}
          className="w-full h-150 border-0 rounded-lg "
          title="PDF Preview"
        />
      </CardContent>       
    </Card>
  )
}