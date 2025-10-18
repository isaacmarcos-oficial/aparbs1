import { Card } from "@/components/ui/card"
import { Catalog } from "@/types/catalogTypes"
import { Weight, Ruler, Box } from "lucide-react"

interface ProductSpecsProps {
  product: Catalog
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  const specs = [
    {
      icon: Weight,
      label: "Peso Bruto",
      value: product.pesobruto,
    },
    {
      icon: Weight,
      label: "Peso Líquido",
      value: product.pesoliquido,
    },
    {
      icon: Ruler,
      label: "Dimensões",
      value: `${product.altura} × ${product.largura} × ${product.profundidade}`,
    },
    {
      icon: Box,
      label: "Volume",
      value: product.metroscubicos,
    },
  ]

  return (
    <section className="py-12">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Especificações Técnicas</h2>
          <p className="text-muted-foreground mt-2">Informações detalhadas sobre o produto</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {specs.map((spec, index) => {
            const Icon = spec.icon
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground mb-1">{spec.label}</p>
                    <p className="text-lg font-semibold text-foreground">{spec.value}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
