import React from 'react';
import { CreditCard, Tag, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/financials';
import { Expense, ServiceType } from '@/types/transportsType';

interface ExpenseTableProps {
  expenses: Expense[];
  service: ServiceType;
  onDelete?: (id: string) => void;
}

export const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses, service, onDelete }) => {
  const serviceName = service === 'locacao' ? 'Locação' : 'Guincho';

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5 text-red-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Despesas - {serviceName}
          </h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        {expenses.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
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
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(expense.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {(expense.category)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-red-600">
                      {formatCurrency(expense.amount)}
                    </span>
                  </td>
                  {onDelete && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => onDelete(expense.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Excluir despesa"
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
            <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Nenhuma despesa encontrada</p>
            <p className="text-sm">Adicione despesas para visualizá-las aqui</p>
          </div>
        )}
      </div>
    </div>
  );
};