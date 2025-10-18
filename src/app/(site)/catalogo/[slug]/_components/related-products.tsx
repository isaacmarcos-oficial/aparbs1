import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { getRelatedProducts } from "@/app/actions/catalogActions"

interface RelatedProductsProps {
  category: string
  currentProductId: number
}

export async function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  const relatedProducts = await getRelatedProducts(category, currentProductId)

  if (!relatedProducts.length) return null

  return (
    <section className="py-12 border-t border-border">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Produtos Relacionados</h2>
            <p className="text-muted-foreground mt-2">Outros produtos da categoria {category}</p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex bg-transparent">
            <Link href={`/categoria/${category.toLowerCase()}`}>Ver todos</Link>
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow group"
              title={`Ver detalhes do produto ${product.name}`}
              aria-label={`Produto ${product.name} da marca ${product.marca}`}
            >
              <Link href={`/catalogo/${product.slug}`}>
                <div className="relative aspect-square bg-muted">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={`Imagem do produto ${product.name} da marca ${product.marca}`}
                    fill
                    className="object-contain p-6 group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">{product.marca}</p>
                  <h3 className="font-semibold text-foreground line-clamp-2">{product.name}</h3>
                  <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                    Ver detalhes
                  </Button>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        <div className="flex justify-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href={`/categoria/${category.toLowerCase()}`}>Ver todos os produtos</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}