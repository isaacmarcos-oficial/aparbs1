import { Expense, Revenue } from "@/types/transportsType";
import { DateRange } from "react-day-picker";

// Funções de data e filtro
export const parseLocalDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const isInRange = (dateStr: string, range?: DateRange): boolean => {
  if (!range?.from || !range?.to) return true;
  const date = parseLocalDate(dateStr);
  return date >= range.from && date <= range.to;
};

// Agrupadores
export const groupByCategory = (expenses: Expense[], colors: string[]) => {
  const map = new Map<string, number>();
  expenses.forEach(exp => {
    map.set(exp.category, (map.get(exp.category) || 0) + exp.amount);
  });
  return Array.from(map.entries())
    .map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length]
    }))
    .filter(entry => entry.value > 0);
};

export const groupByPaymentMethod = (revenues: Revenue[], colors: string[]) => {
  const map = new Map<string, number>();
  revenues.forEach(rev => {
    const method = rev.paymentmethod ?? 'nao_informado';
    map.set(method, (map.get(method) || 0) + rev.amount);
  });
  return Array.from(map.entries())
    .map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length]
    }))
    .filter(entry => entry.value > 0);
};

// Gerador de dados mensais
export const generateMonthlyData = (
  revenues: Revenue[],
  expenses: Expense[],
  parseDate: (dateStr: string) => Date
) => {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const monthlyMap = new Map<number, Record<string, number>>();

  for (let i = 0; i < 12; i++) {
    monthlyMap.set(i, {});
  }

  revenues.forEach((r) => {
    const month = parseDate(r.date).getMonth();
    monthlyMap.get(month)![r.service] = (monthlyMap.get(month)![r.service] || 0) + r.amount;
  });

  expenses.forEach((e) => {
    const month = parseDate(e.date).getMonth();
    monthlyMap.get(month)![e.service] = (monthlyMap.get(month)![e.service] || 0) - e.amount;
  });

  return Array.from(monthlyMap.entries()).map(([monthIndex, values]) => ({
    month: months[monthIndex],
    ...values
  }));
};