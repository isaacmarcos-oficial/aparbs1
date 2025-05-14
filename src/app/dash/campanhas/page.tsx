"use client"
import { AddCampaignModal } from "./_components/addCampaignModal"
import { campaignColumns } from "./_components/campaignColumns"
import { DataTable } from "@/components/data-table"
import { useEffect, useState } from "react";
import { Campaign } from "@/types/campaignTypes"


export default function Page() {
  const [campaignData, setCampaignData] = useState<Campaign[]>([]);

  useEffect(() => {
    fetch("/api/campaigns")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar campanhas");
        }
        return res.json();
      })
      .then((data) => {
        // Considerando que sua API retorne um objeto { campaigns: [...] }
        setCampaignData(data.campaigns || data);
      })
      .catch((err) => {
        console.error("Erro ao buscar campanhas:", err);
      });
  }, []);

  return (
    <div className="">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold ">
          Campanhas
        </h1>
        <AddCampaignModal />
      </div>
      <DataTable data={campaignData} columns={campaignColumns} />
    </div>
  )
}
