import { Expense, paymentMethodLabels, Revenue } from "@/types/transportsType";
import { DateRange } from "react-day-picker";

export const formatCurrency = (value: number): string => {
  if (!isFinite(value)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const getPaymentMethodName = (method: string): string => {
  const label = paymentMethodLabels[method as keyof typeof paymentMethodLabels];
  return label ?? 'Não informado';
};

export const paymentMethods = Object.keys(paymentMethodLabels) as (keyof typeof paymentMethodLabels)[];

// export const getCurrentMonthRevenues = (revenues: Revenue[], selectedMonth: string): Revenue[] => {
//   return revenues.filter(revenue => revenue.date.slice(0, 7) === selectedMonth);
// };

// export const getCurrentMonthExpenses = (expenses: Expense[], selectedMonth: string): Expense[] => {
//   return expenses.filter(expense => expense.date.slice(0, 7) === selectedMonth);
// };

export const getRevenuesInRange = (revenues: Revenue[], range?: DateRange): Revenue[] => {
  if (!range?.from || !range?.to) return revenues;

  const from = range.from;
  const to = range.to;

  return revenues.filter(revenue => {
    const date = new Date(revenue.date);
    return date >= from && date <= to;
  });
};

export const getExpensesInRange = (expenses: Expense[], range?: DateRange): Expense[] => {
  if (!range?.from || !range?.to) return expenses;

  const from = range.from;
  const to = range.to;

  return expenses.filter(expense => {
    const date = new Date(expense.date);
    return date >= from && date <= to;
  });
};

export const filterByMonth = (items: (Revenue | Expense)[], selectedMonth: string) => {
  return items.filter(item => item.date.slice(0, 7) === selectedMonth);
};

export const getMonthlyData = (
  revenues: Revenue[],
  expenses: Expense[],
  range?: DateRange
) => {
  const monthlyData = new Map<string, { month: string; revenue: number; expense: number }>();

  const isInRange = (dateStr: string) => {
    if (!range?.from || !range?.to) return true;
    const date = new Date(dateStr);
    return date >= range.from && date <= range.to;
  };

  const addToMap = (dateStr: string, type: 'revenue' | 'expense', amount: number) => {
    if (!isInRange(dateStr)) return;

    const date = new Date(dateStr);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const key = `${year}-${month}`;
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
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, value]) => value);
};