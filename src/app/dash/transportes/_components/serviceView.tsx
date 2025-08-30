import { Expense, Revenue, ServiceType } from '@/types/transportsType';
import { Button } from '@/components/ui/button';
import { FinancialSummary } from './financialSummary';
import { MonthlyChart } from './monthlyChart';
import { RevenueTable } from './revenueTable';
import { ExpenseTable } from './expenseTable';

interface ServiceViewProps {
  service: ServiceType;
  revenues: Revenue[];
  expenses: Expense[];
  onAddRevenue: () => void;
  onAddExpense: () => void;
  onDeleteRevenue: (id: string) => void;
  onDeleteExpense: (id: string) => void;
}

export const ServiceView: React.FC<ServiceViewProps> = ({
  service,
  revenues,
  expenses,
  onAddRevenue,
  onAddExpense,
  onDeleteRevenue,
  onDeleteExpense,
}) => (
  <>
    <FinancialSummary expenses={expenses} revenues={revenues} service={service} />

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <MonthlyChart revenues={revenues} expenses={expenses} service={service} />

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="space-y-3">
          <Button onClick={onAddRevenue} className="w-full bg-green-600 hover:bg-green-700">
            Adicionar Receita
          </Button>
          <Button onClick={onAddExpense} variant="destructive" className="w-full hover:bg-red-700">
            Adicionar Despesa
          </Button>
        </div>
      </div>
    </div>

    <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-8">
      <RevenueTable revenues={revenues} service={service} onDelete={onDeleteRevenue} />
      <ExpenseTable expenses={expenses} service={service} onDelete={onDeleteExpense} />
    </div>
  </>
);