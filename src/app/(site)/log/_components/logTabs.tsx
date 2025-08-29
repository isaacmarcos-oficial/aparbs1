import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, ChartNoAxesCombined, Truck } from "lucide-react";

export default function LogTabs() {
  return (
    <div className="flex flex-col p-4 gap-6">
      <Tabs defaultValue="locacao" className="bg-white rounded-lg shadow-sm p-1">
        <TabsList className="flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all">
          <TabsTrigger className="" value="locacao">
            <Car className="h-5 w-5" />
            <span>Locação</span>
          </TabsTrigger>
          <TabsTrigger value="guincho">
            <Truck className="h-5 w-5" />
            <span>Guincho</span>
          </TabsTrigger>
          <TabsTrigger value="performance">
            <ChartNoAxesCombined className="h-5 w-5" />
            Desempenho
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}