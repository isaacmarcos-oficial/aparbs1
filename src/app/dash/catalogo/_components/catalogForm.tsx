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
  onSubmit?: (updatedItem: Catalog) => void;
}

export default function CatalogForm({ initialData, trigger, onSubmit }: CatalogFormProps) {
  const isEditing = !!initialData;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addCatalog, updateCatalog, getUniqueBrands, getUniqueCategories } = useFinancialData();
  const brandOptions = getUniqueBrands();
  const categoryOptions = getUniqueCategories();

  const [formData, setFormData] = useState<Partial<Catalog>>(initialData ?? {
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
        name: formData.name?.toUpperCase(),
        category: formData.category?.toUpperCase(),
        marca: formData.marca?.toUpperCase(),
        image: imageUrl,
      };

      let result: Catalog;

      if (isEditing && initialData?.id) {
        result = await updateCatalog(initialData.id.toString(), catalogData);
        // await updateCatalog(initialData.id.toString(), catalogData);
        toast.success("Produto atualizado com sucesso!");
      } else {
        result = await addCatalog(catalogData as Omit<Catalog, "id">);
        // await addCatalog(catalogData as Omit<Catalog, "id">);
        setFormData({
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
        });
        toast.success("Produto adicionado com sucesso!");
      }

      onSubmit?.(result);
      setOpen(false);
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
      toast.error("Erro ao salvar produto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="">
        <Button className="flex bg-green-500">
          {trigger ? <Eye /> : <Plus />}
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
                  className="uppercase"
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
                  className="uppercase"
                  list="categoria-options"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
                <datalist id="categoria-options">
                  {categoryOptions.map((category, index) => (
                    <option key={index} value={category} />
                  ))}
                </datalist>
              </div>

              <div>
                <Label>Marca</Label>
                <Input
                  className="uppercase"
                  list="marca-options"
                  value={formData.marca}
                  onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                />
                <datalist id="marca-options">
                  {brandOptions.map((brand, index) => (
                    <option key={index} value={brand} />
                  ))}
                </datalist>

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