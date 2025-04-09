// components/CampaignModal.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";

interface CampaignFormData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export function AddCampaignModal({ onCampaignCreated }: { onCampaignCreated?: () => void }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CampaignFormData>({
    name: "",
    description: "",
    startDate: "",
    endDate: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Exemplo de chamada no seu modal (CampaignModal.tsx)
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);
  setError(null);
  console.log("Form data:", formData);

  try {
    const response = await fetch("/api/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formData,
        // Converte as datas para o formato adequado
        startDate: formData.startDate, // pode enviar como string e converter na API
        endDate: formData.endDate
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao criar a campanha");
    }
    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: ""
    });
    setOpen(false);
    if (onCampaignCreated) onCampaignCreated();
  } catch (err: unknown) {
    setError(err instanceof Error ? err.message : 'Erro inesperado');
  } finally {
    setLoading(false);
  }
}


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusCircle className="h-4 w-4 mr-2" /> {/* Você pode trocar o ícone se preferir */}
          Adicionar Campanha
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Nova Campanha</DialogTitle>
          <DialogDescription>
            Preencha os dados da campanha para criá-la.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nome da Campanha
            </label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Descrição
            </label>
            <Input
              id="description"
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <label htmlFor="startDate" className="block text-sm font-medium">
                Data de Início
              </label>
              <Input
                id="startDate"
                type="date"
                required
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
            <div className="flex-1">
              <label htmlFor="endDate" className="block text-sm font-medium">
                Data de Término
              </label>
              <Input
                id="endDate"
                type="date"
                required
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Criando..." : "Criar Campanha"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
