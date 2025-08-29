import { useState, useEffect } from 'react';
import { Expense, Revenue } from '@/types/transportsType';
import { createClient } from '@/utils/supabase/client';

export const useFinancialData = () => {
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

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
    try {
      const supabase = createClient();
      const { error } = await supabase.from('revenues').delete().eq('id', id);
      if (error) throw error;

      setRevenues(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      setError('Erro ao excluir receita');
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
    error,
    addRevenue,
    addExpense,
    deleteRevenue,
    deleteExpense,
    refetch
  };
};