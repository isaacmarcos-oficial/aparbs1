import React, { useState, useRef } from 'react';
import { Ticket, Upload, AlertCircle } from 'lucide-react';
import { importFromFile } from '@/utils/fileImport';
import { CouponFormDataType } from '@/types/campaignTypes';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface CouponFormProps {
  onSubmit: (data: CouponFormDataType) => void;
}

export function CouponForm({ onSubmit }: CouponFormProps) {
  const [formData, setFormData] = useState<CouponFormDataType>({
    clientCode: '',
    clientName: '',
    orderNumber: '',
    purchaseValue: 0,
    hasInstagramPost: false
  });
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      clientCode: '',
      clientName: '',
      orderNumber: '',
      purchaseValue: 0,
      hasInstagramPost: false
    });
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setImportError(null);
      const data = await importFromFile(file);

      // Process each imported record
      data.forEach(record => {
        onSubmit(record);
      });

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Erro ao importar arquivo');
    }
  };

  return (
    <div className="space-y-6">
      {importError && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{importError}</p>
            </div>
          </div>
        </div>
      )}

      <Card className="p-6 ">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Novo Registro</h2>
          <div className="relative">
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileImport}
              accept=".xlsx,.xls,.csv"
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className=""
            >
              <Upload className="h-4 w-4" />
              Importar Planilha
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <div className="md:col-span-1">
              <Label className="">
                Código
              </Label>
              <Input
                type="text"
                required
                className="w-full p-2 border rounded-md"
                value={formData.clientCode}
                onChange={(e) => setFormData({ ...formData, clientCode: e.target.value })}
              />
            </div>

            <div className="md:col-span-3">
              <Label className="">
                Nome do Cliente
              </Label>
              <Input
                type="text"
                required
                className="w-full p-2 border rounded-md"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              />
            </div>

            <div className="md:col-span-1">
              <Label className="">
                Nº OS ou VB
              </Label>
              <Input
                type="text"
                required
                className="w-full p-2 border rounded-md"
                value={formData.orderNumber}
                onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
              />
            </div>

            <div className="md:col-span-1">
              <Label className="">
                Valor
              </Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                required
                className="w-full p-2 border rounded-md"
                value={formData.purchaseValue}
                onChange={(e) => setFormData({ ...formData, purchaseValue: parseFloat(e.target.value) })}
              />
            </div>

            <div className="md:col-span-1 flex items-end">
              <Label className="flex items-center space-x-2 cursor-pointer">
                <Input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  checked={formData.hasInstagramPost}
                  onChange={(e) => setFormData({ ...formData, hasInstagramPost: e.target.checked })}
                />
                <span className="text-sm font-medium text-gray-700">Post no Instagram</span>
              </Label>
            </div>
          </div>

          <Button
            type="submit"
            className="mt-6 w-full"
          >
            <Ticket size={20} />
            Registrar
          </Button>
        </form>
      </Card>
    </div>
  );
}