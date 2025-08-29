import React from 'react';
import { Receipt, Car, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate, getVehicleName, getPaymentMethodName } from '@/utils/financials';
import { Revenue, ServiceType } from '@/types/transportsType';

interface RevenueTableProps {
  revenues: Revenue[];
  service: ServiceType;
  onDelete?: (id: string) => void;
}

export const RevenueTable: React.FC<RevenueTableProps> = ({ revenues, service, onDelete }) => {
  const serviceName = service === 'locacao' ? 'Locação' : 'Guincho';

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Receipt className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Receitas - {serviceName}
          </h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        {revenues.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  O.S
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Veículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                {onDelete && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {revenues.map((revenue) => (
                <tr key={revenue.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(revenue.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{revenue.osNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {revenue.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Car className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {getVehicleName(revenue.vehicle)} - {revenue.plate}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-green-600">
                      {formatCurrency(revenue.amount)}
                    </span>
                    <div className="text-xs text-gray-500">
                      {getPaymentMethodName(revenue.paymentMethod)}
                    </div>
                  </td>
                  {onDelete && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => onDelete(revenue.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Excluir receita"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Nenhuma receita encontrada</p>
            <p className="text-sm">Adicione receitas para visualizá-las aqui</p>
          </div>
        )}
      </div>
    </div>
  );
};