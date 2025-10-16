import { Card } from "@/components/ui/card";
import { Catalog } from "@/types/catalogTypes";
import Image from "next/image";

interface CardProductProps {
  product: Catalog
}

export default function CardProduct({ product }: CardProductProps) {
  return (
    <Card className="flex flex-col p-4 gap-2 cursor-pointer hover:scale-105 transition">
      <Image
        src={product.image || "placeholder.png"}
        width={300}
        height={200}
        alt="V-mol"
        className="w-full h-40 object-contain"
      />
      <p className="font-bold text-center text-sm mt-2">{product.name}</p>
    </Card>
  )
}