
{/* UI COMPONENTS */}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

{/* ICONS */}
import { FileText, Download, X } from "lucide-react"



export function PDFViewer({ pdfUrl, onClose }: { pdfUrl: string; onClose: () => void }) {
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
        <Button
          onClick={onClose}
          variant="outline"
          className="flex-1 max-w-26 border-zinc-700 text-zinc-100 hover:bg-zinc-800"
        >
          <X className="w-4 h-4 mr-2" />
          Fechar
        </Button>
      </CardHeader>
      <Button
        onClick={() => window.open(pdfUrl, '_blank')}
        className="flex-1 max-w-35 mx-6 bg-blue-600 hover:bg-blue-700"
      >
        <Download className="w-4 h-4 mr-2" />
          Baixar PDF
      </Button>

      <CardContent className="px-6 py-2">
        <iframe
          src={pdfUrl}
          className="w-full h-150 border-0 rounded-lg"
          title="PDF Preview"
        />
      </CardContent>       
    </Card>
  )
}