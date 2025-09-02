import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calculator } from 'lucide-react';
import { formatCurrency, getCurrentMonthRevenues, getCurrentMonthExpenses } from '@/utils/financials';
import { Expense, Revenue, ServiceType } from '@/types/transportsType';
import { Card } from '@/components/ui/card';

interface FinancialSummaryProps {
  revenues: Revenue[];
  expenses: Expense[];
  service: ServiceType;
  selectedMonth: string;
}

export const FinancialSummary: React.FC<FinancialSummaryProps> = ({
  revenues,
  expenses,
  service,
  selectedMonth
}) => {
  const monthlyRevenues = getCurrentMonthRevenues(revenues, selectedMonth);
  const monthlyExpenses = getCurrentMonthExpenses(expenses, selectedMonth);
  const totalRevenue = monthlyRevenues.reduce((sum: number, rev: { amount: number } ) => sum + rev.amount, 0);
  const totalExpenses = monthlyExpenses.reduce((sum: number, exp: { amount: number }) => sum + exp.amount, 0);
  const profit = totalRevenue - totalExpenses;

  const serviceName =
  service === 'performance'
    ? 'Consolidado'
    : service === 'locacao'
    ? 'Locação'
    : 'Guincho';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Receitas - {serviceName}
            </p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {monthlyRevenues.length} transações este mês
        </p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Despesas - {serviceName}
            </p>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(totalExpenses)}
            </p>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <TrendingDown className="h-6 w-6 text-red-600" />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {monthlyExpenses.length} lançamentos este mês
        </p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Lucro - {serviceName}
            </p>
            <p className={`text-2xl font-bold ${profit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {formatCurrency(profit)}
            </p>
          </div>
          <div className={`p-3 rounded-full ${profit >= 0 ? 'bg-blue-100' : 'bg-red-100'}`}>
            <Calculator className={`h-6 w-6 ${profit >= 0 ? 'text-blue-600' : 'text-red-600'}`} />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Receitas - Despesas
        </p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Margem de Lucro
            </p>
            <p className={`text-2xl font-bold ${profit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {totalRevenue > 0 ? ((profit / totalRevenue) * 100).toFixed(1) : '0.0'}%
            </p>
          </div>
          <div className={`p-3 rounded-full ${profit >= 0 ? 'bg-blue-100' : 'bg-red-100'}`}>
            <DollarSign className={`h-6 w-6 ${profit >= 0 ? 'text-blue-600' : 'text-red-600'}`} />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Percentual sobre receita
        </p>
      </Card>
    </div>
  );
};