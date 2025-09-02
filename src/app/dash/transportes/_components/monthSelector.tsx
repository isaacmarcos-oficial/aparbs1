import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface MonthSelectorProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  onMonthChange
}) => {
  const currentDate = new Date();

  const navigateMonth = (direction: 'prev' | 'next') => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const baseDate = new Date(Date.UTC(year, month - 1, 1));

    if (direction === 'prev') {
      baseDate.setUTCMonth(baseDate.getUTCMonth() - 1);
    } else {
      baseDate.setUTCMonth(baseDate.getUTCMonth() + 1);
    }

    const newMonth = `${baseDate.getUTCFullYear()}-${String(baseDate.getUTCMonth() + 1).padStart(2, '0')}`;
    onMonthChange(newMonth);
  };

  const goToCurrentMonth = () => {
    const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    onMonthChange(currentMonth);
  };

  const formatMonthYear = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1)); // UTC evita o shift de fuso
    return date.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC' // força a formatação no UTC
    });
  };

  const isCurrentMonth = selectedMonth === `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Período</h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              title="Mês anterior"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>

            <div className="px-4 py-2 bg-blue-50 rounded-lg min-w-[180px] text-center">
              <span className="text-sm font-medium text-blue-900 capitalize">
                {formatMonthYear(selectedMonth)}
              </span>
            </div>

            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              title="Próximo mês"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>

        {!isCurrentMonth && (
          <button
            onClick={goToCurrentMonth}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Mês Atual
          </button>
        )}
      </div>
    </div>
  );
};