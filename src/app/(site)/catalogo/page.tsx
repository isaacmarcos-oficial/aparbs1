import { Dialog, DialogContent } from "@/components/ui/dialog";
import CardProduct from "./_components/cardProduct";
import { DialogTrigger } from "@radix-ui/react-dialog";
import DialogProduct from "./_components/dialogProduct";
import { products } from "./_components/mockProduct";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export interface Product {
  id: number;
  name: string;
  image?: string;
  category?: string;
  description?: string;
  pesoBruto?: string
  pesoLiquido?: string
  metrosCubicos?: string
  altura?: string
  largura?: string
  profundidade?: string
}

const VonixxLines = [
  {
    id: 1,
    url: "https://res.cloudinary.com/diqaqpm8y/image/upload/VONIXX_dcnufr.jpg",
    name: "Vonixx"
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/diqaqpm8y/image/upload/RAZUX_al0c2k.jpg",
    name: "Razux"
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/diqaqpm8y/image/upload/ZACS_em90mr.jpg",
    name: "Zacs"
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/diqaqpm8y/image/upload/v1760464601/VINTEX_j8x7lz.jpg",
    name: "Vintex"
  }
]

export default function Catalogo() {
  return (
    <div className='flex flex-col p-4 gap-6 w-full max-w-7xl m-auto'>
      <div className="flex relative bg-[url(https://res.cloudinary.com/diqaqpm8y/image/upload/shutterstock_571427833-copy-1_ylazao.png)] bg-no-repeat bg-cover bg-[#000000e9] h-[300px] justify-center items-center rounded-2xl">

        <h1 className="text-white shadow-2xl text-center text-4xl font-bold mt-8">
          Conheça nossos Produtos
        </h1>
      </div>

      <Card className="text-center text-white w-full p-6 bg-zinc-950">
        Este catálogo apresenta exclusivamente os produtos das marcas <strong>Vonixx</strong>, <strong>Zacs</strong>, <strong>Vintex</strong> e <strong>Razux</strong>, voltado para o público profissional e parceiros comerciais. Não representa o portfólio completo de todos os produtos disponíveis da <strong>APARBS</strong>.
      </Card>

      <div className="grid grid-cols-4 gap-4 items-center justify-center my-4 mx-10">
        {VonixxLines.map((line) => (
          <div key={line.id} className="flex flex-col gap-4 items-center">
            <Image
              src={line.url}
              alt={line.name}
              width={300}
              height={200}
              className="w-16 max-h-12 object-contain"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Dialog key={product.id}>
            <DialogTrigger asChild>
              <CardProduct product={product} />
            </DialogTrigger>
            <DialogContent className="">
              <DialogProduct product={product} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}