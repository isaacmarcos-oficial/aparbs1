import React from 'react';
import { CreditCard, Pencil, Tag, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/utils/financials';
import { Expense } from '@/types/transportsType';
import { Badge } from '@/components/ui/badge';
import moment from 'moment';

interface ExpenseTableProps {
  expenses: Expense[];
  onDelete?: (id: string) => void;
  onEdit?: (expense: Expense) => void;
}

export const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses, onEdit, onDelete }) => {
  return (
    <div className="rounded-lg shadow-sm border overflow-x-auto">
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
                  {moment(expense.date).format('DD/MM/YYYY')}
                </td>
                <td className="flex flex-col px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.description}
                  <Badge className='flex justify-center uppercase bg-green-500/10 text-green-500'>
                    {expense.vehicle}
                  </Badge>
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
                <td className="flex items-center px-6 py-6 whitespace-nowrap gap-4">
                  {onDelete && (

                    <button
                      onClick={() => onDelete(expense.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Excluir despesa"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(expense)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
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
          <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Nenhuma despesa encontrada</p>
          <p className="text-sm">Adicione despesas para visualizá-las aqui</p>
        </div>
      )}
    </div>
  );
};