import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { ServiceType, Revenue, Expense, VehicleType, PaymentMethod, Vehicles, } from '@/types/transportsType';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
}

export const FinancialForm: React.FC<FinancialFormProps> = ({
  type,
  service,
  vehicles,
  onSubmitRevenue,
  onSubmitExpense,
  onClose
}) => {
  const [formData, setFormData] = useState<FinancialFormData>({
    date: new Date().toISOString().split('T')[0],
    osNumber: '',
    client: '',
    vehicle: service === 'locacao' ? 'hilux' : 'guincho',
    plate: '',
    paymentMethod: 'dinheiro',
    amount: '',
    description: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (type === 'receita') {
        const {
          date = '',
          osNumber = '',
          client = '',
          vehicle = 'hilux',
          plate = '',
          paymentMethod = 'dinheiro',
          amount = '',
        } = formData;


        await onSubmitRevenue({
          date,
          osNumber,
          client,
          vehicle: vehicle as VehicleType,
          plate,
          paymentMethod: paymentMethod as PaymentMethod,
          amount: parseFloat(amount),
          service,
        });

        toast.success('Receita cadastrada com sucesso!');
      } else {
        const { date = '', vehicle = '', description = '', category = '', amount = '' } = formData;
        await onSubmitExpense({
          date,
          vehicle,
          description,
          category,
          amount: parseFloat(amount),
          service,
        });

        toast.success('Despesa cadastrada com sucesso!');
      }

      onClose();
    } catch (error: unknown) {
      toast.error('Erro ao cadastrar receita/despesa.');
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof FinancialFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isRevenue = type === 'receita';
  const title = isRevenue ? 'Nova Receita' : 'Nova Despesa';
  const serviceName = service === 'locacao' ? 'Locação' : 'Guincho';

  const activeVehicles = vehicles.filter(v => v.active === true);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className=" bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-600">Serviço: {serviceName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-4 w-full">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => updateFormData('date', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {isRevenue && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número O.S
                </label>
                <input
                  type="text"
                  required
                  value={formData.osNumber}
                  onChange={(e) => updateFormData('osNumber', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: 001"
                />
              </div>


              <div className='col-span-2'>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cliente
                </label>
                <input
                  type="text"
                  required
                  value={formData.client}
                  onChange={(e) => updateFormData('client', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nome do cliente"
                />
              </div>

            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Veículo
            </label>
            <select
              required
              value={formData.vehicle}
              onChange={(e) => {
                const selectedValue = e.target.value;
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
            >
              {activeVehicles.map((vehicle) => (
                <option
                  key={vehicle.id}
                  value={`${vehicle.model} - ${vehicle.plate}`}
                  className="uppercase"
                >
                  {vehicle.model} - {vehicle.plate}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Placa
            </label>
            <input
              type="text"
              required
              value={formData.plate}
              onChange={(e) => updateFormData('plate', e.target.value)}
              disabled={service === 'locacao' || !isRevenue}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: ABC-1234"
            />
          </div>

          {!isRevenue && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => updateFormData('category', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="combustivel">Combustível</option>
                  <option value="manutencao">Manutenção</option>
                  <option value="seguro">Seguro</option>
                  <option value="impostos">Impostos</option>
                  <option value="salarios">Salários</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div className='col-span-2'>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descrição da despesa"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Forma de Pagamento
            </label>
            <select
              required
              value={formData.paymentMethod}
              onChange={(e) => updateFormData('paymentMethod', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao_credito">Cartão de Crédito</option>
              <option value="cartao_debito">Cartão de Débito</option>
              <option value="pix">PIX</option>
              <option value="transferencia">Transferência</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valor (R$)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={formData.amount}
              onChange={(e) => updateFormData('amount', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0,00"
            />
          </div>

          <div className="flex space-x-3 pt-4 col-span-2">
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
    </div>
  );
};