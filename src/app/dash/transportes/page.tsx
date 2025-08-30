"use client"
import LogTabs from "./_components/logTabs";
import { useState } from "react";
import { Expense, Revenue, ServiceType } from "@/types/transportsType";
import { useFinancialData } from "@/hooks/useFinancialData";
import { FinancialForm } from "./_components/financialForm";
import { Loader } from "lucide-react";
import { ServiceView } from "./_components/serviceView";
import { VehicleView } from "./_components/vehicleView";
import { PerformanceView } from "./_components/performanceView";
import { toast } from "sonner";

export default function Page() {
  const [activeService, setActiveService] = useState<ServiceType>('locacao');
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'receita' | 'despesa'>('receita');

  const {
    revenues,
    expenses,
    vehicles,
    loading,
    addRevenue,
    addExpense,
    deleteRevenue,
    deleteExpense,
    toggleVehicleStatus
  } = useFinancialData();

  const handleAddRevenue = async (revenue: Omit<Revenue, 'id'>) => {
    try {
      await addRevenue(revenue);
      toast.success('Receita cadastrada com sucesso!')
      setShowForm(false);
    } catch (error: unknown) {
      toast.error('Erro ao adicionar receita')
      console.error('Error adding revenue:', error);
    }
  };

  const handleAddExpense = async (expense: Omit<Expense, 'id'>) => {
    try {
      await addExpense(expense);
      toast.success('Despesa cadastrada com sucesso!')
      setShowForm(false);
    } catch (error: unknown) {
      toast.error('Erro ao adicionar despesa')
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

  const openForm = (type: 'receita' | 'despesa') => {
    setFormType(type);
    setShowForm(true);
  };

  if (loading) {
    return <div className="flex items-center justify-center w-full h-screen"><Loader className="w-6 h-6 animate-spin" /></div>;
  }

  const isServiceView = activeService === 'locacao' || activeService === 'guincho'

  return (
    <div className="flex w-full flex-col gap-6 max-w-7xl mx-auto">
      <LogTabs
        activeService={activeService}
        setActiveService={(service: string) => setActiveService(service as ServiceType)}
      />

      {isServiceView && (
        <ServiceView
          service={activeService}
          revenues={filteredRevenues}
          expenses={filteredExpenses}
          onAddRevenue={() => openForm('receita')}
          onAddExpense={() => openForm('despesa')}
          onDeleteRevenue={deleteRevenue}
          onDeleteExpense={deleteExpense}
        />
      )}

      {activeService === 'vehicles' && (
        <VehicleView
          expenses={expenses}
          revenues={revenues}
          toggleVehicleStatus={toggleVehicleStatus}
          vehicles={vehicles}
        />
      )}

      {activeService === 'performance' && (
        <PerformanceView
          revenues={revenues}
          expenses={expenses}
        />
      )}

      {showForm && (
        <FinancialForm
          type={formType}
          service={activeService}
          vehicles={vehicles}
          onSubmitRevenue={handleAddRevenue}
          onSubmitExpense={handleAddExpense}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}