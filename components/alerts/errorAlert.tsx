{/* UI COMPONENTS */}
import { Alert } from "@/components/ui/alert"

{/* ICONS */}
import { AlertCircle } from "lucide-react"



export default function ErrorAlert({ message }: { message: string }) {
  return (
    <Alert className="bg-red-500/10 border-red-500/20 text-red-400">
      <AlertCircle className="h-4 w-4" />
      <span className="ml-2">{message}</span>
    </Alert>
  )
}   