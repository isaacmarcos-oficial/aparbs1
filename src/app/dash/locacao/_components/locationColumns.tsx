"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react"; // Ícones que vamos usar

type LocationType = {
  id: number;
  name: string;
  vehicle: string;
  createdAt: string;
}

export const locationColumns: ColumnDef<LocationType>[] = [
  // 🔵 Botão de seleção
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar tudo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // 🔵 Nome
  {
    accessorKey: "name",
    header: "Nome",
  },

  // 🔵 Vehicle
  {
    accessorKey: "vehicle",
    header: "Veículo",
  },

  // 🔵 Data
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) =>
      row.original.createdAt
        ? new Intl.DateTimeFormat("pt-BR").format(new Date(row.original.createdAt))
        : "-",
  },

  // 🔵 Botão de Ações
  {
    id: "action",
    header: "Ação",
    cell: ({ row }) => {

      return (
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => console.log(`/admin/usuario/${row.original.id}`)}>
                Ver Usuário
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Editar", row.original.id)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Excluir", row.original.id)}>
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>


      )
    },
    enableSorting: false,
    enableHiding: false,
  },
];