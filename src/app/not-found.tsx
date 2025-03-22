import { Card } from "@/components/ui/card";
import { ArrowLeft, Wrench } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <Card className=" p-8 rounded-2xl shadow-xl border">
          <div className="flex justify-center mb-6">
            <Wrench className="w-20 h-20 text-[#d90000] animate-pulse" />
          </div>

          <h1 className="text-9xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground/50 mb-6">
            Página não encontrada
          </h2>

          <p className="text-foreground/50 mb-8">
            Parece que esta página está em manutenção ou foi removida. <br />
            Nossa equipe de mecânicos está trabalhando nisso!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 font-medium text-secondary"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar para a Página Inicial
            </Link>

            <Link
              href="/contato"
              className="px-6 py-3 bg-green-700 hover:bg-green-600 rounded-lg transition-colors duration-200 font-medium text-secondary"
            >
              Fale conosco
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}