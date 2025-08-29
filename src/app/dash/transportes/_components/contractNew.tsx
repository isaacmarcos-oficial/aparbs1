"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contractSchema = z.object({
  nomeLocatario: z.string().min(3),
  cpfLocatario: z.string(),
  enderecoLocatario: z.string(),
  dataInicio: z.string(),
  dataFim: z.string(),
  valorDiaria: z.string(),
  formaPagamento: z.enum(["Dinheiro", "Pix", "Cartão"]),
})


type ContractFormData = z.infer<typeof contractSchema>

export default function NewContractPage() {
  const { register, handleSubmit } = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
  })

  const [loading, setLoading] = useState(false)

  async function onSubmit(data: ContractFormData) {
    setLoading(true)
    const response = await fetch("/api/contratos/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "contrato.pdf"
    a.click()
    window.URL.revokeObjectURL(url)
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Novo Contrato de Locação</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input {...register("nomeLocatario")} placeholder="Nome do Locatário" />
        <Input {...register("cpfLocatario")} placeholder="CPF" />
        <Textarea {...register("enderecoLocatario")} placeholder="Endereço" />
        <Input {...register("dataInicio")} type="datetime-local" />
        <Input {...register("dataFim")} type="datetime-local" />
        <Input {...register("valorDiaria")} placeholder="Valor da diária (R$)" />
        <select {...register("formaPagamento")} className="input">
          <option value="Dinheiro">Dinheiro</option>
          <option value="Pix">Pix</option>
          <option value="Cartão">Cartão</option>
        </select>
        <Button type="submit" disabled={loading}>
          {loading ? "Gerando PDF..." : "Gerar Contrato"}
        </Button>
      </form>

    </div>
  )
}
