import { AddCampaignModal } from "./_components/addCampaignModal"
import { campaignColumns } from "./_components/campaignColumns"
import { DataTable } from "@/components/data-table"
import { getCampaign } from "./actions";

export default async function Page() {
  const campaign = await getCampaign()

  return (
    <div className="">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold ">
          Campanhas
        </h1>
        <AddCampaignModal />
      </div>
      <DataTable data={campaign} columns={campaignColumns} />
    </div>
  )
}
