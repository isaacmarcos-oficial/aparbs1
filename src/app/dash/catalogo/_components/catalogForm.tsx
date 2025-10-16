"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Plus } from "lucide-react";
import { useState } from "react";
import { Catalog } from "@/types/catalogTypes";
import { ImageUploader } from "@/components/imageUpload";
import { useFinancialData } from "@/hooks/useFinancialData";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { toast } from "sonner";

interface CatalogFormProps {
  initialData?: Catalog;
  trigger?: string;
}

export default function CatalogForm({ initialData, trigger }: CatalogFormProps) {
  const isEditing = !!initialData;
  const [loading, setLoading] = useState(false);
  const { addCatalog, updateCatalog } = useFinancialData();
  
  const [formData, setFormData] = useState<Partial<Catalog>>( initialData ?? {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = formData.image;

      // Se for base64, envia para o Cloudinary
      if (imageUrl?.startsWith("data:image")) {
        imageUrl = await uploadToCloudinary(imageUrl);
      }

      const catalogData = {
        ...formData,
        image: imageUrl,
      };

      if (isEditing && initialData?.id) {
        await updateCatalog(initialData.id.toString(), catalogData);
        toast.success("Produto atualizado com sucesso!");
      } else {
        await addCatalog(catalogData as Omit<Catalog, "id">);
        toast.success("Produto adicionado com sucesso!");
      }
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
      toast.error("Erro ao salvar produto");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500">
          {trigger ? <Eye/> :  <Plus/> } 
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

            <DialogTitle className="text-2xl font-bold sr-only">
              Adicionar Produto
            </DialogTitle>

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
            <Button
              disabled={loading}
              className="w-24"
              type="submit">
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}