import React from 'react';
import { Pencil, Receipt, Trash2 } from 'lucide-react';
import { formatCurrency, getPaymentMethodName } from '@/utils/financials';
import { Revenue, ServiceType } from '@/types/transportsType';
import { Badge } from '@/components/ui/badge';
import moment from 'moment';

interface RevenueTableProps {
  revenues: Revenue[];
  service: ServiceType;
  onDelete?: (id: string) => void;
  onEdit?: (revenue: Revenue) => void;
}

export const RevenueTable: React.FC<RevenueTableProps> = ({ revenues, service, onEdit, onDelete }) => {

  return (
    <div className="rounded-lg shadow-sm border overflow-x-auto">
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
                  {moment(revenue.date).format('DD/MM/YYYY')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{revenue.osNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {revenue.client}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="flex flex-col">
                      {service === 'guincho' && (
                        <span className="text-xs text-gray-500">
                          {revenue.plate}
                        </span>
                      )}
                      <Badge className='text-xs bg-green-500/10 text-green-500 uppercase'>
                        {revenue.vehicle}
                      </Badge>
                    </div>
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
                <td className="flex items-center px-6 py-6 whitespace-nowrap gap-4">
                  {onDelete && (
                    <button
                      onClick={() => onDelete(revenue.id)}
                      className="text-zinc-500 hover:text-red-800 transition-colors"
                      title="Excluir receita"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(revenue)}
                      className="text-zinc-500 hover:text-blue-500 transition-colors"
                      title="Editar receita"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  )}
                </td>
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
  );
};