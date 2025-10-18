import { VonixxLines } from "@/app/actions/campaignActions";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Catalog } from "@/types/catalogTypes";
import Image from "next/image";

interface CardProductProps {
  product: Catalog
}

export default function CardProduct({ product }: CardProductProps) {
  const brand = product.marca?.toLowerCase();

  // Busca a logo correspondente
  const brandLogo = VonixxLines.find(
    (line) => line.name.toLowerCase() === brand
  );

  return (
    <Card
      className="flex flex-col p-4 gap-2 cursor-pointer hover:scale-105 transition relative"
    >
      {/* Badge da marca */}
      {brandLogo && (
        <Badge
          className={`absolute top-2 right-2 p-1 bg-white shadow-md `}
        >
          <Image
            src={brandLogo.url}
            alt={`${brand} logo`}
            width={50}
            height={50}
            className="object-contain h-3 max-h-3"
          />
        </Badge>
      )}

      <Image
        src={product.image || "/placeholder.png"}
        width={300}
        height={200}
        alt={`Produto ${product.name} da marca ${product.marca} disponível na APARBS em Porteirinha MG`}
        className="w-full h-40 object-contain"
      />
      <h3 className="font-bold text-center text-sm mt-2">{product.name}</h3>
    </Card>
  )
}