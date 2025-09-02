import { useState, useEffect } from 'react';
import { Expense, Revenue, Vehicles } from '@/types/transportsType';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';

export const useFinancialData = () => {
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const supabase = createClient();

        const [revenuesRes, expensesRes, vehiclesRes] = await Promise.all([
          supabase.from('revenues').select('*'),
          supabase.from('expenses').select('*'),
          supabase.from('vehicles').select('*'),
        ]);

        if (revenuesRes.error || expensesRes.error || vehiclesRes.error) {
          throw new Error('Erro ao buscar dados do Supabase');
        }

        const sortedRevenues = (revenuesRes.data || []).sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        const sortedExpenses = (expensesRes.data || []).sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setRevenues(sortedRevenues);
        setExpenses(sortedExpenses);
        setVehicles(vehiclesRes.data || []);
      } catch (err: unknown) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Add revenue
  const addRevenue = async (revenue: Omit<Revenue, 'id'>) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('revenues')
        .insert(revenue)
        .select()
        .single();

      if (error || !data) throw error;

      setRevenues(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError('Erro ao adicionar receita');
      throw err;
    }
  };

  // Add expense
  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('expenses')
        .insert(expense)
        .select()
        .single();

      if (error || !data) throw error;

      setExpenses(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError('Erro ao adicionar despesa');
      throw err;
    }
  };

  // Delete revenue
  const deleteRevenue = async (id: string) => {
    console.log("Deleting revenue with ID:", id);
    try {
      const supabase = createClient();
      const { error } = await supabase.from('revenues').delete().eq('id', id);

      if (error) {
        console.error("Supabase delete error:", error);
        toast.error('Erro ao excluir receita');
        throw error;
      }

      setRevenues(prev => prev.filter(r => r.id !== id));
      toast.success('Receita excluída com sucesso!');
    } catch (err) {
      console.error("Error deleting revenue:", err);
      setError('Erro ao excluir receita');
      toast.error('Erro inesperado ao excluir receita');
      throw err;
    }
  };

  // Delete expense
  const deleteExpense = async (id: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.from('expenses').delete().eq('id', id);
      if (error) throw error;

      setExpenses(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      setError('Erro ao excluir despesa');
      throw err;
    }
  };

  // Add vehicle
  const addVehicle = async (vehicle: Omit<Vehicles, 'id'>) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('vehicles')
        .insert(vehicle)
        .select()
        .single();

      if (error || !data) throw error;

      setVehicles(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError('Erro ao adicionar veículo');
      throw err;
    }
  };

  // Update vehicle
  const updateVehicle = async (id: string, updates: Partial<Vehicles>) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('vehicles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error || !data) throw error;

      setVehicles(prev =>
        prev.map(v => (v.id === id ? { ...v, ...updates } : v))
      );
      return data;
    } catch (err) {
      setError('Erro ao atualizar veículo');
      throw err;
    }
  };

  // Toggle vehicle status
  const toggleVehicleStatus = async (id: string, active: boolean) => {
    return updateVehicle(id, { active });
  };

  // Delete vehicle
  const deleteVehicle = async (id: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.from('vehicles').delete().eq('id', id);
      if (error) throw error;

      setVehicles(prev => prev.filter(v => v.id !== id));
    } catch (err) {
      setError('Erro ao excluir veículo');
      throw err;
    }
  };

  // Refetch
  const refetch = async () => {
    setLoading(true);
    try {
      const supabase = createClient();

      const [revenuesRes, expensesRes] = await Promise.all([
        supabase.from('revenues').select('*'),
        supabase.from('expenses').select('*'),
      ]);

      if (revenuesRes.error || expensesRes.error) {
        throw new Error('Erro ao buscar dados do Supabase');
      }

      setRevenues(revenuesRes.data || []);
      setExpenses(expensesRes.data || []);
    } catch (err: unknown) {
      console.error('Erro ao recarregar dados:', err);
      setError('Erro ao recarregar dados');
    } finally {
      setLoading(false);
    }
  };

  return {
    revenues,
    expenses,
    loading,
    vehicles,
    error,
    addRevenue,
    addExpense,
    deleteRevenue,
    deleteExpense,
    addVehicle,
    updateVehicle,
    toggleVehicleStatus,
    deleteVehicle,
    refetch
  };
};