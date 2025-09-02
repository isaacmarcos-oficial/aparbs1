import { Expense, Revenue, ServiceType } from '@/types/transportsType';
import { Button } from '@/components/ui/button';
import { FinancialSummary } from './financialSummary';
import { MonthlyChart } from './monthlyChart';
import { RevenueTable } from './revenueTable';
import { ExpenseTable } from './expenseTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Receipt } from 'lucide-react';

interface ServiceViewProps {
  service: ServiceType;
  revenues: Revenue[];
  expenses: Expense[];
  selectedMonth: string;
  onAddRevenue: () => void;
  onAddExpense: () => void;
  onEditRevenue?: (revenue: Revenue) => void;
  onEditExpense?: (expense: Expense) => void;
  onDeleteRevenue: (id: string) => void;
  onDeleteExpense: (id: string) => void;
}

export const ServiceView: React.FC<ServiceViewProps> = ({
  service,
  revenues,
  expenses,
  selectedMonth,
  onAddRevenue,
  onAddExpense,
  onEditRevenue,
  onEditExpense,
  onDeleteRevenue,
  onDeleteExpense,
}) => (
  <div className='flex flex-col gap-8'>
    <FinancialSummary expenses={expenses} revenues={revenues} service={service} selectedMonth={selectedMonth} />

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <MonthlyChart revenues={revenues} expenses={expenses} service={service} selectedMonth={selectedMonth} />

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

    <div className="w-full">
      <Tabs defaultValue="revenues" className=''>
        <TabsList>
          <TabsTrigger value="revenues" className='data-[state=active]:text-green-500'>
            <Receipt className="h-5 w-5" />
            <h3 className="">
              Receitas - {service === 'locacao' ? 'Locação' : 'Guincho'}
            </h3>
          </TabsTrigger>
          <TabsTrigger value="expenses" className='data-[state=active]:text-red-600'>
            <CreditCard className="h-5 w-5" />
            <h3 className="">
              Despesas - {service === 'locacao' ? 'Locação' : 'Guincho'}
            </h3>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="revenues">
          <RevenueTable
            revenues={revenues}
            service={service}
            onDelete={onDeleteRevenue}
            onEdit={onEditRevenue}
          />
        </TabsContent>
        <TabsContent value="expenses">
          <ExpenseTable
            expenses={expenses}
            onDelete={onDeleteExpense}
            onEdit={onEditExpense}
          />
        </TabsContent>
      </Tabs>
    </div>
  </div>
);