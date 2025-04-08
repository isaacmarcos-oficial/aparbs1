import { Button } from "@/components/ui/button"
import { CampaignTable } from "./_components/campaignTable"
import { Plus } from "lucide-react"

export default function Page() {
  return (
    <main className="p-6">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold ">Campanhas</h1>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          Adicionar Campanha
        </Button>
      </div>
      <CampaignTable />
    </main>
  )
}
