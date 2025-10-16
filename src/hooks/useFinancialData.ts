"use client";
import { useState, useEffect } from 'react';
import { Expense, Revenue, Vehicles } from '@/types/transportsType';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { Catalog } from '@/types/catalogTypes';

export const useFinancialData = () => {
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [catalog, setCatalog] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const supabase = createClient();

        const [revenuesRes, expensesRes, vehiclesRes, catalogRes] = await Promise.all([
          supabase.from('revenues').select('*'),
          supabase.from('expenses').select('*'),
          supabase.from('vehicles').select('*'),
          supabase.from('catalog').select('*'),
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

        const sortedCatalog = (catalogRes.data || []).sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setRevenues(sortedRevenues);
        setExpenses(sortedExpenses);
        setVehicles(vehiclesRes.data || []);
        setCatalog(sortedCatalog);
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

  // Update revenue
  const updateRevenue = async (id: string, updates: Partial<Revenue>) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('revenues')
        .update(updates)
        .eq('id', id)
        .select()

      console.log("id", id)
      console.log("updates", updates)
      console.log("data", data)

      if (error || !data) throw error;

      setRevenues(prev =>
        prev.map(r => (r.id === id ? { ...r, ...updates } : r))
      );

      toast.success('Receita atualizada com sucesso!');
      return data;
    } catch (err) {
      console.error('Erro ao atualizar receita:', err);
      setError('Erro ao atualizar receita');
      toast.error('Erro ao atualizar receita');
      throw err;
    }
  };

  // Update expense
  const updateExpense = async (id: string, updates: Partial<Expense>) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('expenses')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error || !data) throw error;

      setExpenses(prev =>
        prev.map(e => (e.id === id ? { ...e, ...updates } : e))
      );

      toast.success('Despesa atualizada com sucesso!');
      return data;
    } catch (err) {
      console.error('Erro ao atualizar despesa:', err);
      setError('Erro ao atualizar despesa');
      toast.error('Erro ao atualizar despesa');
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

  // Add catalog
  const addCatalog = async (catalogItem: Omit<Catalog, 'id'>) => {
    console.log("catalogItem", catalogItem)
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('catalog')
        .insert(catalogItem)
        .select()
        .single();

      if (error || !data) throw error;

      setCatalog(prev => [data, ...prev]);
      toast.success('Produto adicionado ao catálogo com sucesso!');
      return data;
    } catch (err) {
      console.error('Erro ao adicionar produto ao catálogo:', err);
      setError('Erro ao adicionar produto ao catálogo');
      toast.error('Erro ao adicionar produto ao catálogo');
      throw err;
    }
  };

  // Update catalog
  const updateCatalog = async (id: string, updates: Partial<Catalog>) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("catalog")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error || !data) throw error;

      setCatalog(prev => prev.map(item => item.id === data.id ? data : item));
      return data;
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
      setError("Erro ao atualizar produto");
      throw err;
    }
  };

  const getUniqueBrands = () => {
    const brands = catalog.map(item => item.marca?.trim().toLowerCase()).filter(Boolean);
    return Array.from(new Set(brands));
  };

  const getUniqueCategories = () => {
    const categories = catalog.map(item => item.category?.trim().toLowerCase()).filter(Boolean);
    return Array.from(new Set(categories));
  };

  // Refetch
  const refetch = async () => {
    setLoading(true);
    try {
      const supabase = createClient();

      const [revenuesRes, expensesRes, vehiclesRes, catalogRes] = await Promise.all([
        supabase.from('revenues').select('*'),
        supabase.from('expenses').select('*'),
        supabase.from('vehicles').select('*'),
        supabase.from('catalog').select('*'),
      ]);

      if (revenuesRes.error || expensesRes.error || vehiclesRes.error) {
        throw new Error('Erro ao buscar dados do Supabase');
      }

      setRevenues(revenuesRes.data || []);
      setExpenses(expensesRes.data || []);
      setVehicles(vehiclesRes.data || []);
      setCatalog(catalogRes.data || []);
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
    catalog,
    loading,
    vehicles,
    error,
    addRevenue,
    addExpense,
    addCatalog,
    updateCatalog,
    getUniqueBrands,
    getUniqueCategories,
    updateRevenue,
    updateExpense,
    deleteRevenue,
    deleteExpense,
    addVehicle,
    updateVehicle,
    toggleVehicleStatus,
    deleteVehicle,
    refetch
  };
};