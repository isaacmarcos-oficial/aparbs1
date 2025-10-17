import { ExternalLink, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function MercadoLivreBanner() {
  return (
    <section aria-labelledby="mercado-livre-title" className="flex w-full items-center justify-center">
      <a href="https://www.mercadolivre.com.br/loja/aparbs" target="_blank" rel="noopener noreferrer" className="group flex w-full items-center justify-center max-w-screen-xl pb-6">
        <div className="relative w-full h-[400px] overflow-hidden rounded-xl bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 p-4 ">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center hover:scale-105">
            <div className="grid grid-cols-2 mx-auto px-6 md:px-12 ">
              <div className="max-w-3xl space-y-6">
                {/* Mercado Livre Badge */}
                <div className="inline-flex items-center gap-3 bg-white rounded px-5 py-2.5 shadow-lg">
                  <ShoppingCart className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-900 text-sm font-bold tracking-wide">LOJA OFICIAL</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  </div>
                </div>

                {/* Main Heading */}
                <div id="mercado-livre-title" className="space-y-3">
                  <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight text-balance">
                    Compre agora no
                    <span className="block text-white mt-2 drop-shadow-lg font-black">Mercado Livre</span>
                  </h2>
                  <p className="text-lg md:text-xl text-gray-800 leading-relaxed max-w-2xl text-pretty">
                    Produtos de qualidade com entrega rápida, frete grátis e garantia oficial. Parcele suas compras com
                    segurança.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="">
                  <Button
                    size="lg"
                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-4 text-lg rounded transition-all duration-300 group-hover:translate-x-2 shadow-2xl"
                  >
                    Visitar Loja Oficial
                    <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                {/* Benefits */}
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 text-gray-900">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                    <span className="text-sm font-semibold">Frete Grátis</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-900">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                    <span className="text-sm font-semibold">Entrega Rápida</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-900">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                    <span className="text-sm font-semibold">Parcele sem Juros</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-900">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                    <span className="text-sm font-semibold">Garantia Oficial</span>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center justify-center">
                <Image
                  src={"/mercado-livre-logo.png"}
                  width={1000}
                  height={1000}
                  quality={100}
                  alt="Mercado Livre Logo"
                  className="w-80 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
        </div>
      </a>
    </section>
  )
}
