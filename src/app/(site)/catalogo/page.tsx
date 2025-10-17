import { Dialog, DialogContent } from "@/components/ui/dialog";
import CardProduct from "./_components/cardProduct";
import { DialogTrigger } from "@radix-ui/react-dialog";
import DialogProduct from "./_components/dialogProduct";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { getCatalog } from "@/app/actions/catalogActions";
import { Catalog } from "@/types/catalogTypes";
import { VonixxLines } from "@/app/actions/campaignActions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CatalogoProps {
  searchParams: Promise<{
    termo?: string;
    marca?: string;
    category?: string;
  }>;
}

export default async function Catalogo({ searchParams }: CatalogoProps) {
  const params = await searchParams;

  const termo = params?.termo?.toLowerCase() || "";
  const marca = params?.marca?.toLowerCase() || "";

  const catalog = await getCatalog()

  // Filtragem SSR
  const filteredCatalog = catalog.filter((product: Catalog) => {
    const matchTermo =
      termo === "" ||
      product.name.toLowerCase().includes(termo) ||
      product.description?.toLowerCase().includes(termo);
    const matchMarca = marca === "" || marca === "all" || product.marca?.toLowerCase() === marca;

    return matchTermo && matchMarca
  });

  return (
    <div className='flex flex-col p-4 gap-6 w-full max-w-7xl m-auto'>
      {/* Banner */}
      <div className="flex relative bg-[url(https://res.cloudinary.com/diqaqpm8y/image/upload/shutterstock_571427833-copy-1_ylazao.png)] bg-no-repeat bg-cover bg-[#000000e9] h-[300px] justify-center items-center rounded-2xl">
        <h1 className="text-white shadow-2xl text-center text-4xl font-bold mt-8">
          Conheça nossos Produtos
        </h1>
      </div>

      {/* Texto de apresentação */}
      <Card className="text-center text-white w-full p-6 bg-zinc-950">
        Este catálogo apresenta exclusivamente os produtos das marcas <strong>Vonixx</strong>, <strong>Zacs</strong>, <strong>Vintex</strong> e <strong>Razux</strong>, voltado para o público profissional e parceiros comerciais. Não representa o portfólio completo de todos os produtos disponíveis da <strong>APARBS</strong>.
      </Card>

      {/* LINHAS VONIXX */}
      <div className="grid grid-cols-4 gap-4 items-center justify-center my-4 mx-10">
        {VonixxLines.map((line) => (
          <div key={line.id} className="flex flex-col gap-4 items-center">
            <Image
              src={line.url}
              alt={line.name}
              width={300}
              height={200}
              className="w-16 h-16 max-w-16 max-h-16 object-contain"
            />
          </div>
        ))}
      </div>

      {/* Filtros */}
      <form className=" grid grid-cols-1 md:grid-cols-4 gap-4 my-4 shadow-lg p-4" method="GET">
        <Input
          type="text"
          name="termo"
          placeholder="Buscar por nome ou descrição"
          defaultValue={termo}
          className="uppercase col-span-2"
        />

        <Select
          name="marca"
          defaultValue={marca || "all"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todas as marcas" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Selecione uma marca</SelectLabel>
              <SelectItem value="all">Todas as marcas</SelectItem>
              {[...new Set(catalog.map((p) => p.marca))].map((brand) => (
                <SelectItem key={brand} value={brand?.toLowerCase()}>
                  {brand}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          <Search /> Buscar
        </Button>
      </form>

      {/* Cards de produtos */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredCatalog.map((product: Catalog) => (
          <Dialog key={product.id}>
            <DialogTrigger asChild>
              <CardProduct product={product} />
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogProduct product={product} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}