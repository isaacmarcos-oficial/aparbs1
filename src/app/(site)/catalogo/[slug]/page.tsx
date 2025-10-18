import { getProductBySlug } from "@/app/actions/catalogActions"
import { ProductHero } from "./_components/product-hero"
import { ProductSpecs } from "./_components/product-specs"
import { RelatedProducts } from "./_components/related-products"
import { WhatsAppButton } from "./_components/whatsapp-button"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: "Produto não encontrado",
      description: "Este produto não está disponível no momento.",
    }
  }

  return {
    title: `${product.name} | ${product.marca}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${product.marca}`,
      description: product.description,
      images: [
        {
          url: product.image || "/placeholder.svg",
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${product.marca}`,
      description: product.description,
      images: [product.image || "/placeholder.svg"],
    },
  }
}


export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <ProductHero product={product} />

          <ProductSpecs product={product} />

          <RelatedProducts category={product.category} currentProductId={product.id} />
        </div>
      </main>

      <WhatsAppButton  product={product}/>
    </div>
  )
}
