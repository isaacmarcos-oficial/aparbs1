
import ProgressBar from "@/components/progressBar";
import { Wrench } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="relative">
          <Wrench className="w-24 h-24 text-[#d90000] animate-spin" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent blur-sm -z-10" />
        </div>

        <h1 className="mt-8 text-3xl font-bold text-white">
          Carregando
          <span className="inline-flex ml-2">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce delay-100">.</span>
            <span className="animate-bounce delay-200">.</span>
          </span>
        </h1>

        <p className="mt-4 text-zinc-400 max-w-md mx-auto">
          Preparando as ferramentas para melhor atendê-lo
        </p>

        {/* Progress Bar */}
        <ProgressBar />

        <div className="mt-12 text-zinc-500 text-sm">
          <p>APARBS Soluções Automotivas</p>
        </div>
      </div>
    </div>
  )
}