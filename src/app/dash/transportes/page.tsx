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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DateRange } from "react-day-picker";
import Calendar23 from "@/components/calendar-23";

export default function Page() {
  const [activeService, setActiveService] = useState<ServiceType>('locacao');
  const [showForm, setShowForm] = useState(false);
  const [editingRevenue, setEditingRevenue] = useState<Revenue | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [formType, setFormType] = useState<'receita' | 'despesa'>('receita');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const {
    revenues,
    expenses,
    vehicles,
    loading,
    addRevenue,
    addExpense,
    updateRevenue,
    updateExpense,
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

  const handleEditRevenue = async (updated: Omit<Revenue, 'id'>) => {
    if (!editingRevenue) return;
    try {
      await updateRevenue(editingRevenue.id, updated);
      toast.success('Receita atualizada com sucesso!');
      setEditingRevenue(null);
    } catch (error) {
      toast.error('Erro ao atualizar receita');
      console.error('Error updating revenue:', error);
    }
  };

  const handleEditExpense = async (updated: Omit<Expense, 'id'>) => {
    if (!editingExpense) return;
    try {
      await updateExpense(editingExpense.id, updated);
      toast.success('Despesa atualizada com sucesso!');
      setEditingExpense(null);
    } catch (error) {
      toast.error('Erro ao atualizar despesa');
      console.error('Error updating expense:', error);
    }
  };

  const isPerformanceView = activeService === 'performance';

  const filteredRevenues = revenues.filter(revenue => {
    const revenueDate = new Date(revenue.date);
    const matchesService = isPerformanceView || revenue.service === activeService;
    const matchesRange =
      dateRange?.from && dateRange?.to
        ? revenueDate >= dateRange.from && revenueDate <= dateRange.to
        : true;
    return matchesService && matchesRange;
  });

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const matchesService = isPerformanceView || expense.service === activeService;
    const matchesRange =
      dateRange?.from && dateRange?.to
        ? expenseDate >= dateRange.from && expenseDate <= dateRange.to
        : true;
    return matchesService && matchesRange;
  });

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

      <Calendar23
        range={dateRange}
        setRange={setDateRange}
      />

      {isServiceView && (
        <ServiceView
          dateRange={dateRange}
          service={activeService}
          revenues={filteredRevenues}
          expenses={filteredExpenses}
          onAddRevenue={() => openForm('receita')}
          onAddExpense={() => openForm('despesa')}
          onEditRevenue={(revenue) => {
            setFormType('receita');
            setEditingRevenue(revenue);
          }}
          onEditExpense={(expense) => {
            setFormType('despesa');
            setEditingExpense(expense);
          }}
          onDeleteRevenue={deleteRevenue}
          onDeleteExpense={deleteExpense}
        />
      )}

      {activeService === 'vehicles' && (
        <VehicleView
          expenses={expenses}
          revenues={revenues}
          dateRange={dateRange}
          toggleVehicleStatus={toggleVehicleStatus}
          vehicles={vehicles}
        />
      )}

      {activeService === 'performance' && (
        <PerformanceView
          revenues={revenues}
          expenses={expenses}
          dateRange={dateRange}
        />
      )}

      <Dialog
        open={showForm || editingRevenue !== null || editingExpense !== null}
        onOpenChange={(open) => {
          if (!open) {
            setShowForm(false);
            setEditingRevenue(null);
            setEditingExpense(null);
          }
        }}
      >
        <DialogContent>
          <FinancialForm
            type={formType}
            service={activeService}
            vehicles={vehicles}
            onSubmitRevenue={editingRevenue ? handleEditRevenue : handleAddRevenue}
            onSubmitExpense={editingExpense ? handleEditExpense : handleAddExpense}
            onClose={() => {
              setShowForm(false);
              setEditingRevenue(null);
              setEditingExpense(null);
            }}
            initialData={editingRevenue || editingExpense || undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}