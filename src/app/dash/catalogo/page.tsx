import { getCatalog } from "@/app/actions/catalogActions";
import CatalogTable from "./_components/catalogTable";

export default async function Catalog () {
  const catalog = await getCatalog()

  return (
    <div>
      <CatalogTable catalog={catalog} />
    </div>
  )
}