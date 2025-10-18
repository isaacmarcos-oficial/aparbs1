"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Catalog } from "@/types/catalogTypes"

interface ProductHeroProps {
  product: Catalog
}

export function ProductHero({ product }: ProductHeroProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [imageScale, setImageScale] = useState(false)

  const handleBudget = () => {
    const message = `Olá! Estou no site e gostaria de solicitar um orçamento para o produto ${product.name}.`
    const encodedMessage = encodeURIComponent(message)
    const url = `https://wa.me/553832208767?text=${encodedMessage}`
    window.open(url, "_blank")
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 py-8"
      title={`Ver detalhes do produto ${product.name}`}
      aria-label={`Produto ${product.name} da marca ${product.marca}`}
    >
      {/* Product Image */}
      <div className="relative aspect-square shadow-xl rounded-lg overflow-hidden">
        <div
          className={`w-full h-full transition-transform duration-300 ${imageScale ? "scale-110" : "scale-100"}`}
          onMouseEnter={() => setImageScale(true)}
          onMouseLeave={() => setImageScale(false)}
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={`Imagem do produto ${product.name} da marca ${product.marca}`}
            fill
            className="object-contain p-8"
            priority
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-center space-y-6">
        <div className="space-y-3">
          <Badge variant="secondary" className="w-fit">
            {product.category}
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-balance text-foreground">{product.name}</h1>

          <p className="text-muted-foreground text-lg">
            Marca: <span className="font-semibold text-foreground">{product.marca}</span>
          </p>
        </div>

        <div className="space-y-2">
          <p className={`text-foreground leading-relaxed ${!showFullDescription && "line-clamp-3"}`}>
            {product.description}
          </p>
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-primary hover:underline text-sm font-medium"
          >
            {showFullDescription ? "Ver menos" : "Ver mais"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            size="lg"
            className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700"
            onClick={handleBudget}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Solicitar orçamento
          </Button>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            💬 Atendimento rápido via WhatsApp • Entrega para Porteirinha e região
          </p>
        </div>
      </div>
    </div>
  )
}
