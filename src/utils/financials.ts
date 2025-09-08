import { Expense, paymentMethodLabels, Revenue } from "@/types/transportsType";

export const formatCurrency = (value: number): string => {
  if (!isFinite(value)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// export const getPaymentMethodName = (method: keyof typeof paymentMethodLabels): string => {
//   return paymentMethodLabels[method];
// };

export const getPaymentMethodName = (method: string): string => {
  const label = paymentMethodLabels[method as keyof typeof paymentMethodLabels];
  return label ?? 'Não informado';
};

export const paymentMethods = Object.keys(paymentMethodLabels) as (keyof typeof paymentMethodLabels)[];

export const getCurrentMonthRevenues = (revenues: Revenue[], selectedMonth: string): Revenue[] => {
  return revenues.filter(revenue => revenue.date.slice(0, 7) === selectedMonth);
};

export const getCurrentMonthExpenses = (expenses: Expense[], selectedMonth: string): Expense[] => {
  return expenses.filter(expense => expense.date.slice(0, 7) === selectedMonth);
};

export const filterByMonth = (items: (Revenue | Expense)[], selectedMonth: string) => {
  return items.filter(item => item.date.slice(0, 7) === selectedMonth);
};

export const getMonthlyData = (revenues: Revenue[], expenses: Expense[]) => {
  const monthlyData = new Map<string, { month: string; revenue: number; expense: number }>();

  const addToMap = (dateStr: string, type: 'revenue' | 'expense', amount: number) => {
    const date = new Date(dateStr);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const key = `${year}-${month}`; // chave padronizada: "2025-08"
    const label = date.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    });

    if (!monthlyData.has(key)) {
      monthlyData.set(key, { month: label, revenue: 0, expense: 0 });
    }

    monthlyData.get(key)![type] += amount;
  };

  revenues.forEach(rev => addToMap(rev.date, 'revenue', rev.amount));
  expenses.forEach(exp => addToMap(exp.date, 'expense', exp.amount));

  return Array.from(monthlyData.entries())
    .sort(([a], [b]) => a.localeCompare(b)) // ordena por chave "YYYY-MM"
    .map(([, value]) => value)
    .slice(-6); // últimos 6 meses
};