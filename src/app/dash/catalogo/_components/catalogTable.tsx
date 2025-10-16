"use client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { useState } from "react";
import CatalogAdd from "./catalogForm";
import { Catalog } from "@/types/catalogTypes";
import CatalogForm from "./catalogForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CatalogTableProps {
  catalog: Catalog[];
}

export default function CatalogTable({ catalog }: CatalogTableProps) {
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCatalog = catalog.filter((product) => {
    const matchesBrand = selectedBrand && selectedBrand !== "all" ? product.marca?.toLowerCase() === selectedBrand : true;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  return (
    <div>
      <div className="flex justify-between gap-6 shadow-md p-4 rounded-xl max-w-7xl mx-auto">
        <div className="w-full md:w-1/2">
          <Input
            placeholder="Buscar"
            className="w-full p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Select onValueChange={(value) => setSelectedBrand(value)}>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Filtros" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Marcas</SelectLabel>
                <SelectItem value="all">TODAS</SelectItem>
                <SelectItem value="vonixx">VONIXX</SelectItem>
                <SelectItem value="vintex">VINTEX</SelectItem>
                <SelectItem value="razux">RAZUX</SelectItem>
                <SelectItem value="zacs">ZACS</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <CatalogAdd />
        </div>
      </div>

      <Table className=" my-6 shadow-lg rounded-xl max-w-7xl mx-auto">
        <TableHeader className="bg-muted text-primary rounded-xl">
          <TableRow className="text-primary font-bold">
            <TableHead className="w-1/5">Produto</TableHead>
            <TableHead className="w-1/5">Categoria</TableHead>
            <TableHead className="w-1/5">Marca</TableHead>
            <TableHead className="w-1/5 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {filteredCatalog.map((product) => (
            <TableRow key={product.id} className="flex-wrap">
              <TableCell className="flex  items-center gap-3">
                <Image
                  src={product.image || ""}
                  width={100}
                  height={100}
                  alt="V-mol"
                  className="min-h-16 min-w-16 w-16 h-16 shadow-md object-contain"
                />
                <h3 className="font-semibold">{product.name}</h3>
              </TableCell>
              <TableCell className=" text-xs text-muted-foreground">
                {product.category || "Sem categoria"}
              </TableCell>
              <TableCell className=" text-xs text-muted-foreground">
                {product.marca || "Sem marca"}
              </TableCell>
              <TableCell className=" flex items-center text-right justify-end gap-3">
                <CatalogForm initialData={product} trigger="Editar" />
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}