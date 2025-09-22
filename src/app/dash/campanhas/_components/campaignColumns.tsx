"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpDown, Eye, MoreHorizontal, Target } from "lucide-react"
import Link from "next/link"
import { Campaign } from "@/types/campaignTypes"
import moment from "moment"

export const campaignColumns: ColumnDef<Campaign>[] = [
  // SELECT
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // STATUS DA CAMPANHA
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const start = new Date(row.original.startDate);
      const end = new Date(row.original.endDate);
      const now = new Date();

      if (now < start) {
        status = "programmed";
      } else if (now >= start && now <= end) {
        status = "ongoing";
      } else {
        status = "finished";
      }

      const statusColors: Record<string, string> = {
        "finished": "text-red-500",
        "ongoing": "text-yellow-500",
        "programmed": "text-blue-500",
      };

      return <Target className={statusColors[status] || "text-gray-500"} />;
    },
  },
  // NOME DA CAMPANHA
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Nome da campanha
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  // INICIO DA CAMPANHA
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Início
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{moment(row.getValue("startDate")).format("DD/MM/YY")}</div>,
  },
  // FIM DA CAMPANHA
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Fim
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{moment(row.getValue("endDate")).format("DD/MM/YY")}</div>,
  },
  // AÇÃO
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const campaign = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/dash/campanhas/${campaign.id}`}>
              <DropdownMenuItem>
                <Eye className="h-4 w-4" />
                Visualizar Campanha
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu >
      );
    },
  },
];
