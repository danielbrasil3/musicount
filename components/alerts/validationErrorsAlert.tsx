{/* ICONS */} 
import { AlertCircle } from "lucide-react"


export default function ValidationErrorsAlert({ errors }: { errors: string[] }) {
  return (
    <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 p-4 rounded-md">
      <div className="flex items-start gap-2">
        <AlertCircle className="h-4 w-4 mt-1" />
        <div>
          <p className="font-semibold mb-2">Erros de Validação:</p>
          <ul className="space-y-1 text-sm">
            {errors.map((error, index) => (
              <li key={index} className="flex gap-2">
                <span>•</span>
                <span>{error}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}