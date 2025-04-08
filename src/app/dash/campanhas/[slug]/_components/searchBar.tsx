import React from 'react';
import { Search } from 'lucide-react';
import { SearchFiltersType } from '@/types/campaignTypes';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
}

export function SearchBar({ filters, onFiltersChange }: SearchBarProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center mb-4">
        <Search className="h-5 w-5 text-muted-foreground" />
        <h2 className="ml-2 text-lg font-medium">Filtrar Registros</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label className="">
            Código
          </Label>
          <Input
            type="text"
            className="w-full p-2 border rounded-md"
            value={filters.clientCode}
            onChange={(e) => onFiltersChange({ ...filters, clientCode: e.target.value })}
            placeholder="Buscar por código"
          />
        </div>

        <div>
          <Label className="">
            Nome do Cliente
          </Label>
          <Input
            type="text"
            className="w-full p-2 border rounded-md"
            value={filters.clientName}
            onChange={(e) => onFiltersChange({ ...filters, clientName: e.target.value })}
            placeholder="Buscar por nome"
          />
        </div>

        <div>
          <Label className="">
            OS/VB
          </Label>
          <Input
            type="text"
            className="w-full p-2 border rounded-md"
            value={filters.orderNumber}
            onChange={(e) => onFiltersChange({ ...filters, orderNumber: e.target.value })}
            placeholder="Buscar por OS/VB"
          />
        </div>

        <div>
          <Label className="">
            Cupom
          </Label>
          <Input
            type="text"
            className="w-full p-2 border rounded-md"
            value={filters.couponNumber}
            onChange={(e) => onFiltersChange({ ...filters, couponNumber: e.target.value })}
            placeholder="Buscar número exato"
          />
        </div>
      </div>
    </Card>
  );
}