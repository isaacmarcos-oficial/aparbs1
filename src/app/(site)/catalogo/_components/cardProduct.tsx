import { Card } from "@/components/ui/card";
import { Product } from "../page";
import Image from "next/image";

interface CardProductProps {
  product: Product
}

export default function CardProduct({ product }: CardProductProps) {
  return (
    <Card className="flex flex-col p-4 gap-2 cursor-pointer hover:scale-105 transition">
      <Image
        src={product.image || ""}
        width={300}
        height={200}
        alt="V-mol"
        className="w-full h-40 object-contain"
      />
      <p className="font-bold text-center">{product.name}</p>
    </Card>
  )
}