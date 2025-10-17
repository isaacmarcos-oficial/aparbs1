"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import Image from "next/image"
import { Catalog } from "@/types/catalogTypes"

interface DialogProductProps {
  product: Catalog
}
export default function DialogProduct({ product }: DialogProductProps) {

  const specs = [
    { label: "Peso bruto", value: product.pesobruto },
    { label: "Peso líquido", value: product.pesoliquido },
    { label: "Metros Cúbicos", value: product.metroscubicos },
    { label: "Altura", value: product.altura },
    { label: "Largura", value: product.largura },
    { label: "Profundidade", value: product.profundidade },
  ]

  const handleBudget = () => {
    const message = `Olá! Estou no site e gostaria de solicitar um orçamento para o produto ${product.name}.`
    const encodedMessage = encodeURIComponent(message)
    const url = `https://wa.me/553832208767?text=${encodedMessage}`
    window.open(url, "_blank")
  }

  return (
    <div className="flex flex-col" key={product.id} aria-label={`Detalhes do produto ${product.name}`}>
      <div className="flex items-center justify-between p-4 border-b rounded-t ">
        <p className="text-xl font-semibold">
          {product.name}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <article className="flex h-full justify-center items-center">
          <Image
            title={`Produto ${product.name} - ${product.marca}`}
            src={product.image || ""}
            width={300}
            height={200}
            alt={`Imagem do produto ${product.name} da Vonixx para estética automotiva`}
            className="flex justify-center max-h-80 items-center object-contain shadow-lg p-4"
          />
        </article>

        <div className="w-full space-y-4">
          {/* Descrição */}
          <section className="">
            <h2 className="mb-2 font-semibold leading-none ">
              Descrição:
            </h2>
            <div className="max-h-24 overflow-auto mb-4 p-4 bg-muted rounded">
              <p className="mb-4 font-light sm:mb-5 text-sm">
                {product.description}
              </p>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4">
            {specs.map(({ label, value }) => (
              <Card key={label} className="p-4 bg-muted">
                <p className="mb-1 font-semibold leading-none">{label}</p>
                <p className="text-sm">{value || "—"}</p>
              </Card>
            ))}
          </section>

          <Button
            className="w-full font-semibold"
            size="lg"
            onClick={handleBudget}
            aria-label={`Solicitar orçamento para ${product.name}`}
          >
            <ShoppingBag className="w-5 h-5" />
            Solicitar orçamento
          </Button>
        </div>
      </div>
    </div>
  )
}