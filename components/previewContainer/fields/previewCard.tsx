
{/* UI COMPONENTS */}
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

{/* ICONS */}
import { FileText, Plus, X } from "lucide-react"

{/* TYPES */}
import type { FormDataType } from "@/lib/types"

{/* FIELDS */}
import { GeneralInfoSection } from "./generalInfoSection"
import { MusiciansSection } from "./musiciansSection"
import { MinistryBrotherhoodSection } from "./ministryBrotherhoodSection"
import { ComplementsSection } from "./complementsSection"

interface PreviewCardProps {
	formData: FormDataType
	getTipoEventoLabel: (key: string) => string
	getInstrumentLabel: (key: string) => string
	getMinisterioLabel: (key: string) => string
	onReset: () => void
}


export function PreviewCard({ formData, getTipoEventoLabel, getInstrumentLabel, getMinisterioLabel, onReset }: PreviewCardProps) {

	return (
		<Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
			<CardHeader className="flex flex-row items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="p-2 rounded-lg bg-blue-500/10">
						<FileText className="w-5 h-5 text-blue-400" />
					</div>
					<div>
						<CardTitle className="text-zinc-100">Preview do Relatório</CardTitle>
						<CardDescription className="text-zinc-400">Confira os dados antes de gerar o PDF</CardDescription>
					</div>
				</div>
				<Button
					onClick={onReset}
					variant="outline"
					className="flex-1 max-w-38 border-blue-700 text-blue-400 hover:bg-blue-800"
				>
					<Plus className="w-4 h-4 mr-1" />
					Novo Relatório
				</Button>
			</CardHeader>
			<CardContent className="space-y-6">
				<GeneralInfoSection formData={formData} getTipoEventoLabel={getTipoEventoLabel} />
				<MusiciansSection formData={formData} getInstrumentLabel={getInstrumentLabel} />
				<MinistryBrotherhoodSection formData={formData} getMinisterioLabel={getMinisterioLabel} />
				<ComplementsSection formData={formData} />
			</CardContent>
		</Card>
	)
}