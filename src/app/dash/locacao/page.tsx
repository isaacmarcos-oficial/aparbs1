import { DataTable } from "@/components/data-table";
import { locationColumns } from "./_components/locationColumns";

const data = [
  {
    id: 1,
    name: "John Does",
    vehicle: "Volkswagen Voyage 1.6",
    createdAt: "2023-01-01",
  }
]

export default function Page() {
  return (
    <div className="">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold ">
          Locação
        </h1>
      </div>
      <DataTable data={data} columns={locationColumns} />
      {/* <ContractContent /> */}
    </div>
  )
}