import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ServiceType, Revenue, Expense, PaymentMethod, Vehicles, categories, getCategoriesName, } from '@/types/transportsType';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogTitle } from '@/components/ui/dialog';
import { getPaymentMethodName, paymentMethods } from '@/utils/financials';

type FinancialFormData = {
  date: string;
  osNumber?: string;
  client?: string;
  vehicle?: string;
  plate?: string;
  paymentMethod?: string;
  amount: string;
  description?: string;
  category?: string;
};

interface FinancialFormProps {
  type: 'receita' | 'despesa';
  service: ServiceType;
  vehicles: Vehicles[];
  onSubmitRevenue: (revenue: Omit<Revenue, 'id'>) => void;
  onSubmitExpense: (expense: Omit<Expense, 'id'>) => void;
  onClose: () => void;
  initialData?: Partial<Revenue | Expense>
}

export const FinancialForm: React.FC<FinancialFormProps> = ({
  type,
  service,
  vehicles,
  initialData,
  onSubmitRevenue,
  onSubmitExpense,
  onClose
}) => {
  const [formData, setFormData] = useState<FinancialFormData>(() => {
    const isRevenue = type === 'receita';
    const safeData = initialData ?? {}; // garante que não seja undefined

    return {
      date: safeData.date || new Date().toISOString().split('T')[0],
      osNumber: isRevenue ? (safeData as Revenue).osNumber ?? '' : '',
      client: isRevenue ? (safeData as Revenue).client ?? '' : '',
      vehicle: safeData.vehicle ?? (service === 'locacao' ? 'hilux' : 'guincho'),
      plate: isRevenue ? (safeData as Revenue).plate ?? '' : '',
      paymentMethod: isRevenue ? (safeData as Revenue).paymentMethod ?? '' : '',
      amount: safeData.amount?.toString() ?? '',
      description: !isRevenue ? (safeData as Expense).description ?? '' : '',
      category: !isRevenue ? (safeData as Expense).category ?? '' : '',
    };
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isEditing = !!initialData;
      const isRevenue = type === 'receita';

      if (isRevenue) {
        const {
          date = '',
          osNumber = '',
          client = '',
          vehicle = '',
          plate = '',
          paymentMethod = '',
          amount = '',
        } = formData;

        await onSubmitRevenue({
          date,
          osNumber,
          client,
          vehicle,
          plate,
          paymentMethod: paymentMethod as PaymentMethod,
          amount: parseFloat(amount),
          service,
        });

        toast.success(isEditing ? 'Receita atualizada com sucesso!' : 'Receita cadastrada com sucesso!');
      } else {
        const {
          date = '',
          vehicle = '',
          description = '',
          category = '',
          amount = '',
        } = formData;

        await onSubmitExpense({
          date,
          vehicle,
          description,
          category,
          amount: parseFloat(amount),
          service,
        });

        toast.success(isEditing ? 'Despesa atualizada com sucesso!' : 'Despesa cadastrada com sucesso!');
      }

      onClose();
    } catch (error: unknown) {
      toast.error('Erro ao salvar receita/despesa.');
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof FinancialFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isRevenue = type === 'receita';
  const title = initialData
    ? isRevenue ? 'Editar Receita' : 'Editar Despesa'
    : isRevenue ? 'Nova Receita' : 'Nova Despesa';
  const serviceName = service === 'locacao' ? 'Locação' : 'Guincho';

  const activeVehicles = vehicles.filter(v => v.active === true);

  return (
    <div className="">
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className="">
          <div className="flex items-center gap-2">
            <DialogTitle className="text-lg font-semibold text-gray-900">{title}</DialogTitle>
            <Badge className="text-xs bg-sky-500"> {serviceName}</Badge>
          </div>
        </div>

        <Separator className="" />

        <div className="my-2 grid grid-cols-2 gap-4 w-full">
          <div>
            <Label>
              Data
            </Label>
            <Input
              type="date"
              required
              value={formData.date}
              onChange={(e) => updateFormData('date', e.target.value)}
              className=""
            />
          </div>

          {isRevenue && (
            <>
              <div>
                <Label>
                  Número O.S
                </Label>
                <Input
                  type="text"
                  required
                  value={formData.osNumber}
                  onChange={(e) => updateFormData('osNumber', e.target.value)}
                  className=""
                  placeholder="Ex: 001"
                />
              </div>


              <div className='col-span-2'>
                <Label>
                  Cliente
                </Label>
                <Input
                  type="text"
                  required
                  value={formData.client}
                  onChange={(e) => updateFormData('client', e.target.value)}
                  className=""
                  placeholder="Nome do cliente"
                />
              </div>

            </>
          )}

          <div>
            <Label>
              Veículo
            </Label>
            <Select
              required
              value={formData.vehicle}
              onValueChange={(value) => {
                const selectedValue = value;
                updateFormData('vehicle', selectedValue);

                if (service === 'locacao' || !isRevenue) {
                  const selectedVehicle = activeVehicles.find(
                    (v) => `${v.model} - ${v.plate}` === selectedValue
                  );
                  if (selectedVehicle) {
                    updateFormData('plate', selectedVehicle.plate);
                  }
                }
              }}
            >
              <SelectTrigger className='uppercase'>
                <SelectValue placeholder="Selecione um veículo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Veículo</SelectLabel>
                  {activeVehicles.map((vehicle) => (
                    <SelectItem
                      key={vehicle.id}
                      value={`${vehicle.model} - ${vehicle.plate}`}
                      className="uppercase"
                    >
                      {vehicle.model} - {vehicle.plate}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>
              Placa
            </Label>
            <Input
              type="text"
              required
              value={formData.plate}
              onChange={(e) => updateFormData('plate', e.target.value)}
              disabled={service === 'locacao' || !isRevenue}
              className=""
              placeholder="Ex: ABC-1234"
            />
          </div>

          {!isRevenue && (
            <>
              <div>
                <Label>
                  Categoria
                </Label>
                <Select
                  required
                  value={formData.category}
                  onValueChange={(value) => updateFormData('category', value)}
                >
                  <SelectTrigger className='uppercase'>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categoria</SelectLabel>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className="uppercase"
                        >
                          {getCategoriesName(category)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className='col-span-2'>
                <Label>
                  Descrição
                </Label>
                <Input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  className=""
                  placeholder="Descrição da despesa"
                />
              </div>
            </>
          )}

          <div>
            <Label>
              Forma de Pagamento
            </Label>
            <Select
              required
              value={formData.paymentMethod}
              onValueChange={(value) => updateFormData('paymentMethod', value)}
            >
              <SelectTrigger className='uppercase'>
                <SelectValue placeholder="Selecione uma forma de pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Forma de Pagamento</SelectLabel>
                  {paymentMethods.map((method) => (
                    <SelectItem
                      key={method}
                      value={method}
                      className="uppercase"
                    >
                      {getPaymentMethodName(method)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>
              Valor (R$)
            </Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              required
              value={formData.amount}
              onChange={(e) => updateFormData('amount', e.target.value)}
              className=""
              placeholder="0,00"
            />
          </div>


        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            type="button"
            onClick={onClose}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-white font-medium transition-colors ${isRevenue
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700'
              }`}
          >
            <Plus className="h-4 w-4" />
            <span>Salvar {isRevenue ? 'Receita' : 'Despesa'}</span>
          </Button>
        </div>
      </form>
    </div>
  );
};