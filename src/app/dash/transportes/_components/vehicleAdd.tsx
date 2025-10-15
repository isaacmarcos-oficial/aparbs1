import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useFinancialData } from "@/hooks/useFinancialData";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function VehicleAdd() {
  const { addVehicle } = useFinancialData()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    model: "",
    plate: "",
    active: true
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addVehicle({
        model: formData.model.toUpperCase(),
        plate: formData.plate.toUpperCase(),
        active: formData.active
      })
      setFormData({ model: "", plate: "", active: true })
      toast.success("Veículo criado com sucesso!")
    } catch (err: unknown) {
      toast.error("Erro ao criar veículo")
      setError(err instanceof Error ? err.message : "Erro inesperado")
    } finally {
      setLoading(false)
    }

    toast.success('Veículo cadastrado com sucesso!')
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'icon'} className='bg-green-500 hover:bg-green-600/80'>
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="model" className="block text-sm font-medium">
              Modelo
            </Label>
            <Input
              id="model"
              className="uppercase"
              type="text"
              required
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="plate" className="block text-sm font-medium">
              Placa
            </Label>
            <Input
              id="plate"
              className="uppercase"
              type="text"
              required
              value={formData.plate}
              onChange={(e) =>
                setFormData({ ...formData, plate: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="active">Ativo</Label>
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, active: checked })
              }
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <DialogFooter>
            <Button disabled={loading} type="submit">
              {loading ? "Criando..." : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}