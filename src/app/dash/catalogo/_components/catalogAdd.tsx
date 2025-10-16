import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Catalog } from "@/types/catalogTypes";
import { ImageUploader } from "@/components/imageUpload";

export default function CatalogAdd() {
  const [formData, setFormData] = useState<Partial<Catalog>>({
    name: "",
    description: "",
    image: "",
    category: "",
    pesobruto: "",
    pesoliquido: "",
    metroscubicos: "",
    altura: "",
    largura: "",
    profundidade: "",
    marca: "",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl flex flex-col gap-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 items-center gap-6">
            <div className="">
              <ImageUploader
                onChange={(file, url) => setFormData({ ...formData, image: url })}
                initialImageUrl={formData.image ?? ""}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Nome</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="col-span-2">
                <Label>Descrição</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>


              <div>
                <Label>Categoria</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>

              <div>
                <Label>Marca</Label>
                <Input
                  value={formData.marca}
                  onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                />
              </div>
              <div>
                <Label>Peso Bruto</Label>
                <Input
                  value={formData.pesobruto}
                  onChange={(e) => setFormData({ ...formData, pesobruto: e.target.value })}
                />
              </div>
              <div>
                <Label>Peso Líquido</Label>
                <Input
                  value={formData.pesoliquido}
                  onChange={(e) => setFormData({ ...formData, pesoliquido: e.target.value })}
                />
              </div>
              <div>
                <Label>m³</Label>
                <Input
                  value={formData.metroscubicos}
                  onChange={(e) => setFormData({ ...formData, metroscubicos: e.target.value })}
                />
              </div>
              <div>
                <Label>Altura</Label>
                <Input
                  value={formData.altura}
                  onChange={(e) => setFormData({ ...formData, altura: e.target.value })}
                />
              </div>
              <div>
                <Label>Largura</Label>
                <Input
                  value={formData.largura}
                  onChange={(e) => setFormData({ ...formData, largura: e.target.value })}
                />
              </div>
              <div>
                <Label>Profundidade</Label>
                <Input
                  value={formData.profundidade}
                  onChange={(e) => setFormData({ ...formData, profundidade: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end mt-4 gap-3">
            <DialogClose>
              <Button className="w-24" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button className="w-24" type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}