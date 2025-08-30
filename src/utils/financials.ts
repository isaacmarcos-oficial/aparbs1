import { Expense, PaymentMethod, Revenue, VehicleType } from "@/types/transportsType";


export const formatCurrency = (value: number): string => {
  if (!isFinite(value)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
};

export const getPaymentMethodName = (method: PaymentMethod): string => {
  const methods = {
    dinheiro: 'Dinheiro',
    cartao_credito: 'Cartão de Crédito',
    cartao_debito: 'Cartão de Débito',
    pix: 'PIX',
    transferencia: 'Transferência'
  };
  return methods[method];
};

export const getVehicleName = (vehicle: VehicleType): string => {
  const vehicles = {
    hilux: 'Hilux',
    voyage: 'Voyage',
    gol: 'Gol',
    guincho: 'Guincho'
  };
  return vehicles[vehicle];
};

// export const getCategoryName = (category: string): string => {
//   const categories = {
//     combustivel: 'Combustível',
//     manutencao: 'Manutenção',
//     seguro: 'Seguro',
//     impostos: 'Impostos',
//     salarios: 'Salários',
//     outros: 'Outros'
//   };
//   return categories[category];
// };

export const getCurrentMonthRevenues = (revenues: Revenue[]): Revenue[] => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  return revenues.filter(revenue => {
    const revenueDate = new Date(revenue.date);
    return revenueDate.getMonth() === currentMonth && 
           revenueDate.getFullYear() === currentYear;
  });
};

export const getCurrentMonthExpenses = (expenses: Expense[]): Expense[] => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && 
           expenseDate.getFullYear() === currentYear;
  });
};

export const getMonthlyData = (revenues: Revenue[], expenses: Expense[]) => {
  const monthlyData = new Map();
  
  // Process revenues
  revenues.forEach(revenue => {
    const date = new Date(revenue.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    const monthName = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    
    if (!monthlyData.has(monthKey)) {
      monthlyData.set(monthKey, { month: monthName, revenue: 0, expense: 0 });
    }
    
    monthlyData.get(monthKey).revenue += revenue.amount;
  });
  
  // Process expenses
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    const monthName = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    
    if (!monthlyData.has(monthKey)) {
      monthlyData.set(monthKey, { month: monthName, revenue: 0, expense: 0 });
    }
    
    monthlyData.get(monthKey).expense += expense.amount;
  });
  
  return Array.from(monthlyData.values())
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-6); // Last 6 months
};