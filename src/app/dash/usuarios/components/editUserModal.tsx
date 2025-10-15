"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil } from "lucide-react";
import { user } from "@prisma/client";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { updateUser } from "../action";
import { toast } from "sonner";

interface EditUserSheetProps {
  user: user;
  onUserUpdated?: () => void;
}

export function EditUserModal({ user, onUserUpdated }: EditUserSheetProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState<user["role"]>(user.role);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await updateUser(user.id, { name, email, role }) // ✅ chamada direta
      toast.success("Usuário atualizado com sucesso!")
      if (onUserUpdated) onUserUpdated()
    } catch (err) {
      toast.error("Erro ao atualizar usuário")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Função</Label>
            <Select value={role} onValueChange={(val) => setRole(val as user["role"])}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Usuário</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="superAdmin">Super Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Salvando..." : "Salvar alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}