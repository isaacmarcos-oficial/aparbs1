import React from 'react';
import { BarChart3 } from 'lucide-react';
import {  Revenue, Expense, ServiceType } from '@/types/transportsType';
import { formatCurrency, getMonthlyData } from '@/utils/financials';

interface MonthlyChartProps {
  revenues: Revenue[];
  expenses: Expense[];
  service: ServiceType;
}

export const MonthlyChart: React.FC<MonthlyChartProps> = ({
  revenues,
  expenses,
  service
}) => {
  const monthlyData = getMonthlyData(revenues, expenses);
  const maxAmount = Math.max(
    ...monthlyData.map(data => Math.max(data.revenue, data.expense))
  );

  const serviceName =
  service === 'performance'
    ? 'Consolidado'
    : service === 'locacao'
    ? 'Locação'
    : 'Guincho';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Comparativo Mensal - {serviceName}
        </h3>
      </div>

      <div className="space-y-4">
        {monthlyData.map((data, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">{data.month}</span>
              <div className="flex space-x-4 text-sm">
                <span className="text-green-600">
                  Receita: {formatCurrency(data.revenue)}
                </span>
                <span className="text-red-600">
                  Despesa: {formatCurrency(data.expense)}
                </span>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-16 text-xs text-gray-500">Receita</div>
                <div className="flex-1 bg-gray-100 rounded-full h-3 relative overflow-hidden">
                  <div 
                    className="bg-green-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${maxAmount > 0 ? (data.revenue / maxAmount) * 100 : 0}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-16 text-xs text-gray-500">Despesa</div>
                <div className="flex-1 bg-gray-100 rounded-full h-3 relative overflow-hidden">
                  <div 
                    className="bg-red-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${maxAmount > 0 ? (data.expense / maxAmount) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {monthlyData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>Nenhum dado disponível para exibir</p>
        </div>
      )}
    </div>
  );
};