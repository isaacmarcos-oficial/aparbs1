import React, { useState, useRef } from 'react';
import { Ticket, Upload, AlertCircle, LoaderIcon, Loader2 } from 'lucide-react';
import { CouponFormDataType } from '@/types/campaignTypes';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { downloadCouponTemplate } from '@/utils/downloadTemplate';
import { importFromFile } from '@/utils/importFromFile';
import { redirect } from 'next/navigation';

interface CouponFormProps {
  onSubmit?: (formData: CouponFormDataType) => void; // <-- aqui
  campaignId: string
}

export function CouponForm({ onSubmit, campaignId }: CouponFormProps) {
  const [importLoading, setImportLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CouponFormDataType>({
    campaignId: campaignId,
    clientCode: '',
    cpf: '',
    clientName: '',
    orderNumber: '',
    purchaseValue: 0,
    hasInstagramPost: false,
    saleDate: new Date()
  });
  const [importError, setImportError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const redirectToSorteio = () => {
    redirect(`/dash/campanhas/${campaignId}/sorteio`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await fetch('/api/coupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });


      if (!response.ok) {
        throw new Error('Erro ao criar cupom');
      }

      const createdCoupon = await response.json();
      setSuccessMessage('Cupom registrado com sucesso!');
      setFormData({
        campaignId: campaignId,
        clientCode: '',
        cpf: '',
        clientName: '',
        orderNumber: '',
        purchaseValue: 0,
        hasInstagramPost: false,
        saleDate: new Date()
      });

      setLoading(false);
      // Se houver callback para atualizar uma lista em um componente pai
      if (onSubmit) {
        onSubmit(createdCoupon);
      }

    } catch (error: unknown) {
      console.error(error);
      setSuccessMessage('');
      setImportError(error instanceof Error ? error.message : 'Erro ao registrar cupom');
    }
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportLoading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setImportError(null);
      const data = await importFromFile(file, campaignId);

      for (const record of data) {
        const fullData = {
          ...record,
          campaignId: campaignId,
          hasInstagramPost: false // sempre vem false por padrão
        };

        const response = await fetch('/api/coupons', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fullData)
        });

        if (!response.ok) {
          throw new Error('Erro ao importar registro');
        }
      }
      setSuccessMessage('Registros importados com sucesso!');
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Erro ao importar arquivo');
    } finally {
      setImportLoading(false);
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

      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      <Card className="p-6 ">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Novo Registro</h2>
          <div className="flex relative gap-2 items-center">
            <Button
              size="sm"
              onClick={redirectToSorteio}
            >
              Ir para sorteio
            </Button>
            <Button
              size="sm"
              onClick={downloadCouponTemplate}
            >
              Baixar Modelo
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileImport}
              accept=".xlsx,.xls,.csv"
              className="hidden"
            />
            <Button
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className=""
              disabled={importLoading}
            >
              {importLoading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Importar
                </>
              )
              }
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

            <div className="md:col-span-1">
              <Label className="">
                CPF
              </Label>
              <Input
                type="text"
                required
                className="w-full p-2 border rounded-md"
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
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

            <div className="md:col-span-1">
              <Label>Data da Venda</Label>
              <Input
                type="date"
                required
                className="w-full p-2 border rounded-md"
                value={
                  formData.saleDate
                    ? formData.saleDate.toISOString().split('T')[0]
                    : ''
                }
                onChange={(e) =>
                  setFormData({ ...formData, saleDate: new Date(e.target.value) })
                }
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
            disabled={loading}
            type="submit"
            className="mt-6 w-full"
          >
            {loading ? (
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                <Ticket size={20} />
                Registrar
              </>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}