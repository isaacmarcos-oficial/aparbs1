import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VonixxBanner() {
  return (
    <section className="w-full" aria-label="Banner distribuidor oficial produtos Vonixx">
      <Link href="/catalogo" title="Explorar catálogo de produtos Vonixx" className="group flex max-w-screen-xl mx-auto py-6">
        <div className="relative w-full h-[500px] md:h-[400px] overflow-hidden rounded-xl">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/diqaqpm8y/image/upload/shutterstock_571427833-copy-1_ylazao.png)",
            }}
            aria-hidden="true"
            role="presentation"
          >
            {/* Dark Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-2xl space-y-6">
                {/* Main Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight text-balance">
                  SOMOS
                  <span className="block text-amber-400 mt-2 font-black">DISTRIBUIDOR OFICIAL VONIXX</span>
                </h2>

                {/* Description */}
                <p className="text-lg md:text-lg text-white/90 leading-relaxed max-w-xl text-pretty">
                  Produtos profissionais de alta performance para estética veicular com excelência e sofisticação.
                </p>

                {/* CTA Button */}
                <div className="">
                  <Button
                    size="lg"
                    className="bg-amber-500 text-black font-semibold px-8 py-4 text-lg rounded transition-all duration-300 group-hover:translate-x-2 shadow-2xl shadow-amber-500/50"
                    aria-label="Explorar catálogo de produtos Vonixx"
                  >
                    Explorar Catálogo
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                    <span className="text-sm font-medium">Alta Performance</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                    <span className="text-sm font-medium">Qualidade Premium</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                    <span className="text-sm font-medium">Resultados Profissionais</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-amber-400/5 rounded-full blur-2xl" />
        </div>
      </Link>
    </section>
  )
}