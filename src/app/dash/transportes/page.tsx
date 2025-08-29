"use client"
import LogTabs from "./_components/logTabs";
import { FinancialSummary } from "./_components/financialSummary";
import { useState } from "react";
import { Expense, Revenue, ServiceType } from "@/types/transportsType";
import { MonthlyChart } from "./_components/monthlyChart";
import { Button } from "@/components/ui/button";
import { RevenueTable } from "./_components/revenueTable";
import { ExpenseTable } from "./_components/expenseTable";
import { useFinancialData } from "@/hooks/useFinancialData";
import { FinancialForm } from "./_components/financialForm";
import { Loader } from "lucide-react";

export default function Page() {
  const [activeService, setActiveService] = useState<ServiceType>('locacao');
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'receita' | 'despesa'>('receita');

  const {
    revenues,
    expenses,
    loading,
    error,
    addRevenue,
    addExpense,
    deleteRevenue,
    deleteExpense
  } = useFinancialData();

  const handleAddRevenue = async (revenue: Omit<Revenue, 'id'>) => {
    try {
      await addRevenue(revenue);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding revenue:', error);
    }
  };

  const handleAddExpense = async (expense: Omit<Expense, 'id'>) => {
    try {
      await addExpense(expense);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const isPerformanceView = activeService === 'performance';

  const filteredRevenues = isPerformanceView
    ? revenues
    : revenues.filter(revenue => revenue.service === activeService);

  const filteredExpenses = isPerformanceView
    ? expenses
    : expenses.filter(expense => expense.service === activeService);

  // const filteredRevenues = revenues.filter(revenue => revenue.service === activeService);
  // const filteredExpenses = expenses.filter(expense => expense.service === activeService);

  const openForm = (type: 'receita' | 'despesa') => {
    setFormType(type);
    setShowForm(true);
  };

  if (loading) {
    return <div><Loader className="w-6 h-6 animate-spin" /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex w-full flex-col gap-6 max-w-7xl mx-auto">
      <LogTabs
        activeService={activeService}
        setActiveService={(service: string) => setActiveService(service as ServiceType)}
      />

      <FinancialSummary
        expenses={filteredExpenses}
        revenues={filteredRevenues}
        service={activeService}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <MonthlyChart
          revenues={filteredRevenues}
          expenses={filteredExpenses}
          service={activeService}
        />

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ações Rápidas
          </h3>
          <div className="space-y-3">
            <Button
              onClick={() => openForm('receita')}
              className="w-full bg-green-600 px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Adicionar Receita
            </Button>
            <Button
              onClick={() => openForm('despesa')}
              variant={"destructive"}
              className="w-full px-4 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Adicionar Despesa
            </Button>
          </div>
        </div>

      </div>


      {activeService !== 'performance' &&
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-8">
          <RevenueTable
            revenues={filteredRevenues}
            service={activeService}
            onDelete={deleteRevenue}
          />

          <ExpenseTable
            expenses={filteredExpenses}
            service={activeService}
            onDelete={deleteExpense}
          />
        </div>
      }


      {showForm && (
        <FinancialForm
          type={formType}
          service={activeService}
          onSubmitRevenue={handleAddRevenue}
          onSubmitExpense={handleAddExpense}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}