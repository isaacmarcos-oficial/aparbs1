"use client"
import { Button } from "@/components/ui/button"
import { Catalog } from "@/types/catalogTypes"
import { MessageCircle } from "lucide-react"

interface WhatsAppButtonProps {
  product: Catalog
}

export function WhatsAppButton({ product }: WhatsAppButtonProps) {
  const handleBudget = () => {
    const message = `Olá! Estou no site e gostaria de solicitar um orçamento para o produto ${product.name}.`
    const encodedMessage = encodeURIComponent(message)
    const url = `https://wa.me/553832208767?text=${encodedMessage}`
    window.open(url, "_blank")
  }

  return (
      <Button
        size="icon"
        onClick={handleBudget}
        rel="noopener noreferrer"
        className="rounded-full fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 h-14 w-14 shadow-lg hover:shadow-xl transition-all"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Contato via WhatsApp</span>
      </Button>
  )
}
