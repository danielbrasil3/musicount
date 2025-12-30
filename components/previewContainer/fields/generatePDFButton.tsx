"use client"

import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { Download } from "lucide-react"

interface DownloadButtonProps {
  onClick: () => void
}

export function GeneratePDFButton({ onClick }: DownloadButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700 transition-all duration-300"
      size="lg"
      >
        <FileText className="w-5 h-5 mr-2" />
        Gerar Relatório em PDF
    </Button>
  )
}
