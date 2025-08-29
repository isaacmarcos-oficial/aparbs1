import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, ChartNoAxesCombined, Truck } from "lucide-react";

interface LogTabsProps {
  activeService: string;
  setActiveService: (service: string) => void;
}

export default function LogTabs({ activeService, setActiveService }: LogTabsProps) {
  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue={activeService} className="bg-white rounded-lg shadow-sm p-1">
        <TabsList className="flex items-center space-x-2  rounded-md font-medium transition-all py-6">
          <TabsTrigger className="p-2" value="locacao" onClick={() => setActiveService('locacao')}>
            <Car className="h-5 w-5" />
            <span>Locação</span>
          </TabsTrigger>
          <TabsTrigger className="p-2" value="guincho" onClick={() => setActiveService('guincho')}>
            <Truck className="h-5 w-5" />
            <span>Guincho</span>
          </TabsTrigger>
          <TabsTrigger className="p-2" value="performance" onClick={() => setActiveService('performance')}>
            <ChartNoAxesCombined className="h-5 w-5" />
            Desempenho
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}