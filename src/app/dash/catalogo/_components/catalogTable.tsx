"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CatalogAdd from "./catalogAdd";
import { Catalog } from "@/types/catalogTypes";

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
      <div className="flex justify-between gap-6 shadow-md p-4 rounded-xl">
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

      <div className="my-4">
        {filteredCatalog.map((product) => (
          <div key={product.id} className="flex justify-between gap-6 border-b p-4  h-20">
            <div className="flex w-full md:w-1/2 items-center gap-3">
              <Image
                src={product.image || ""}
                width={100}
                height={100}
                alt="V-mol"
                className="w-16 h-16 shadow-md object-contain"
              />
              <h3 className="font-semibold">{product.name}</h3>
            </div>
            <div className="flex items-center gap-3">
              <Button className="bg-green-500">
                <Eye />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}