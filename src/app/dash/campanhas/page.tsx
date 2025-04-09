import { CampaignTable } from "./_components/campaignTable"
import { AddCampaignModal } from "./_components/addCampaignModal"

export default function Page() {
  return (
    <div className="">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold ">
          Campanhas
        </h1>
        <AddCampaignModal />
      </div>
      <CampaignTable />
    </div>
  )
}
