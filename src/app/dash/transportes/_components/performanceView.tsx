import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency, getPaymentMethodName } from '@/utils/financials';
import { categoriesLabels, Expense, getCategoriesName, Revenue } from '@/types/transportsType';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PerformanceViewProps {
  revenues: Revenue[];
  expenses: Expense[];
  selectedMonth: string;
}

export function PerformanceView({ revenues, expenses, selectedMonth }: PerformanceViewProps) {
  const [currentYear, currentMonth] = selectedMonth.split('-').map(Number);

  const parseLocalDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const monthlyRevenues = revenues.filter((r) => {
    const date = parseLocalDate(r.date);
    return date.getFullYear() === currentYear && date.getMonth() === currentMonth - 1;
  });

  const monthlyExpenses = expenses.filter((e) => {
    const date = parseLocalDate(e.date);
    return date.getFullYear() === currentYear && date.getMonth() === currentMonth - 1;
  });

  // Calculate totals for both services
  const locacaoRevenue = monthlyRevenues
    .filter(r => r.service === 'locacao')
    .reduce((sum, r) => sum + r.amount, 0);

  const guinchoRevenue = monthlyRevenues
    .filter(r => r.service === 'guincho')
    .reduce((sum, r) => sum + r.amount, 0);

  const locacaoExpense = monthlyExpenses
    .filter(e => e.service === 'locacao')
    .reduce((sum, e) => sum + e.amount, 0);

  const guinchoExpense = monthlyExpenses
    .filter(e => e.service === 'guincho')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalRevenue = locacaoRevenue + guinchoRevenue;
  const totalExpense = locacaoExpense + guinchoExpense;
  const totalProfit = totalRevenue - totalExpense;
  const totalMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  const generateMonthlyData = (revenues: Revenue[], expenses: Expense[]) => {
    const months = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const monthlyMap = new Map<number, { locacao: number; guincho: number }>();

    for (let i = 0; i < 12; i++) {
      monthlyMap.set(i, { locacao: 0, guincho: 0 });
    }

    revenues.forEach((r) => {
      const date = parseLocalDate(r.date);
      const month = date.getMonth();
      if (r.service === 'locacao' || r.service === 'guincho') {
        monthlyMap.get(month)![r.service] += r.amount;
      }
    });

    expenses.forEach((e) => {
      const date = parseLocalDate(e.date);
      const month = date.getMonth();
      if (e.service === 'locacao' || e.service === 'guincho') {
        monthlyMap.get(month)![e.service] -= e.amount;
      }
    });

    return Array.from(monthlyMap.entries()).map(([monthIndex, values]) => ({
      month: months[monthIndex],
      locacao: values.locacao,
      guincho: values.guincho,
    }));
  };

  const serviceComparison = [
    { name: 'Locação', receitas: locacaoRevenue, despesas: locacaoExpense },
    { name: 'Guincho', receitas: guinchoRevenue, despesas: guinchoExpense },
  ];

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#8b5cf6'];

  const categoryMap = new Map<string, number>();

  monthlyExpenses.forEach(exp => {
    categoryMap.set(exp.category, (categoryMap.get(exp.category) || 0) + exp.amount);
  });

  const expensesByCategory = Array.from(categoryMap.entries())
    .map(([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length]
    }))
    .filter((entry) => entry.value > 0);

  const paymentMethodMap = new Map<string, number>();

  monthlyRevenues.forEach(rev => {
    const method = rev.paymentMethod ?? 'nao_informado';
    paymentMethodMap.set(method, (paymentMethodMap.get(method) || 0) + rev.amount);
  });

  const revenuesByPaymentMethod = Array.from(paymentMethodMap.entries())
    .map(([method, value], index) => ({
      name: method,
      value,
      color: COLORS[index % COLORS.length]
    }))
    .filter((entry) => entry.value > 0);

  const previousMonthDate = new Date(currentYear, currentMonth - 2); // -2 porque getMonth() é zero-based
  const previousYear = previousMonthDate.getFullYear();
  const previousMonth = previousMonthDate.getMonth();

  const previousRevenues = revenues.filter((r) => {
    const date = parseLocalDate(r.date);
    return date.getFullYear() === previousYear && date.getMonth() === previousMonth;
  });

  const previousExpenses = expenses.filter((e) => {
    const date = parseLocalDate(e.date);
    return date.getFullYear() === previousYear && date.getMonth() === previousMonth;
  });

  const previousRevenueTotal = previousRevenues.reduce((sum, r) => sum + r.amount, 0);
  const previousExpenseTotal = previousExpenses.reduce((sum, e) => sum + e.amount, 0);
  const previousProfit = previousRevenueTotal - previousExpenseTotal;
  const previousMargin = previousRevenueTotal > 0 ? (previousProfit / previousRevenueTotal) * 100 : 0;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Desempenho</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium">Total Receitas</h3>
          <p className="text-2xl font-bold text-green-400 mt-1">
            {formatCurrency(totalRevenue)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {totalRevenue >= previousRevenueTotal ? '▲' : '▼'} {formatCurrency(totalRevenue - previousRevenueTotal)} vs mês anterior
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium">Total Despesas</h3>
          <p className="text-2xl font-bold text-red-400 mt-1">
            {formatCurrency(locacaoExpense + guinchoExpense)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {totalExpense >= previousExpenseTotal ? '▲' : '▼'} {formatCurrency(totalExpense - previousExpenseTotal)} vs mês anterior
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium">Lucro Total</h3>
          <p className="text-2xl font-bold text-blue-400 mt-1">
            {formatCurrency((locacaoRevenue + guinchoRevenue) - (locacaoExpense + guinchoExpense))}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {totalProfit >= previousProfit ? '▲' : '▼'} {formatCurrency(totalProfit - previousProfit)} vs mês anterior
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium">Margem</h3>
          <p className="text-2xl font-bold text-purple-400 mt-1">
            {totalMargin.toFixed(2)}%
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {totalMargin >= previousMargin ? '▲' : '▼'} {(totalMargin - previousMargin).toFixed(2)} pts vs mês anterior
          </p>
        </Card>
      </div>

      {/* Desempenho mensal */}
      <Card className="p-6">
        <h3 className="text-xl font-semibol mb-6">Desempenho Mensal</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={generateMonthlyData(revenues, expenses)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                color: '#111827'
              }}

            />
            <Bar dataKey="locacao" fill="#3B82F6" radius={4} />
            <Bar dataKey="guincho" fill="#8B5CF6" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Despesas por categoria */}
      <Card className="flex flex-col p-6">
        <h3 className="text-xl font-semibold mb-6">Despesas por Categoria</h3>
        <div className="w-full">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expensesByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {expensesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [
                  formatCurrency(value),
                  getCategoriesName(name as keyof typeof categoriesLabels)
                ]}

                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  color: '#111827'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap justify-center gap-2 items-center space-y-2">
          {expensesByCategory
            .sort((a, b) => b.value - a.value)
            .map((entry, index) => {
              const total = expensesByCategory.reduce((sum, e) => sum + e.value, 0);
              const percent = ((entry.value / total) * 100).toFixed(0);
              return (
                <div key={entry.name} className="flex items-center">
                  <Badge variant="secondary" key={entry.name} className="flex items-center gap-2 text-sm text-gray-700 uppercase">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium">{getCategoriesName(entry.name as keyof typeof categoriesLabels)} {formatCurrency(entry.value)}</span>
                    <span className="text-gray-500">— {percent}%</span>
                  </Badge>
                </div>
              );
            })}
        </div>
      </Card>

      {/* Receita por forma de pagamento */}
      <Card className="flex flex-col p-6">
        <h3 className="text-xl font-semibold mb-6">Despesas por Forma de Pagamento</h3>
        <div className="w-full">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenuesByPaymentMethod}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {revenuesByPaymentMethod.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                // formatter={(value: number) => formatCurrency(value)}
                formatter={(value: number, name: string) => [
                  formatCurrency(value),
                  getPaymentMethodName(name)
                ]}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  color: '#111827'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap justify-center gap-2 items-center space-y-2">
          {revenuesByPaymentMethod
            .sort((a, b) => b.value - a.value)
            .map((entry, index) => {
              const total = revenuesByPaymentMethod.reduce((sum, e) => sum + e.value, 0);
              const percent = ((entry.value / total) * 100).toFixed(0);
              console.log(entry)
              return (
                <div key={entry.name} className="flex items-center">
                  <Badge variant="secondary" key={entry.name} className="flex items-center gap-2 text-sm text-gray-700 uppercase">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium">{getPaymentMethodName(entry.name)}</span>
                    <span className="font-medium">{formatCurrency(entry.value)}</span>
                    <span className="text-gray-500">— {percent}%</span>
                  </Badge>
                </div>
              );
            })}
        </div>
      </Card>

      {/* Service Comparison */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">Comparação de Serviços</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={serviceComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                color: '#111827'
              }}
            />
            <Bar dataKey="receitas" fill="#10B981" radius={4} />
            <Bar dataKey="despesas" fill="#EF4444" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}