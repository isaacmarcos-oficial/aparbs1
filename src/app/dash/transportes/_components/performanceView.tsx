import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency } from '@/utils/financials';
import { Expense, Revenue } from '@/types/transportsType';
import { Card } from '@/components/ui/card';

interface PerformanceViewProps {
  revenues: Revenue[];
  expenses: Expense[];
}

export function PerformanceView({ revenues, expenses }: PerformanceViewProps) {
  // Calculate totals for both services
  const locacaoRevenue = revenues
    .filter(r => r.service === 'locacao')
    .reduce((sum, r) => sum + r.amount, 0);

  const guinchoRevenue = revenues
    .filter(r => r.service === 'guincho')
    .reduce((sum, r) => sum + r.amount, 0);

  const locacaoExpense = expenses
    .filter(e => e.service === 'locacao')
    .reduce((sum, e) => sum + e.amount, 0);

  const guinchoExpense = expenses
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
      const date = new Date(r.date);
      const month = date.getMonth();
      if (r.service === 'locacao' || r.service === 'guincho') {
        monthlyMap.get(month)![r.service] += r.amount;
      }
    });

    expenses.forEach((e) => {
      const date = new Date(e.date);
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

  expenses.forEach(exp => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const expDate = new Date(exp.date);

    if (expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear) {
      categoryMap.set(exp.category, (categoryMap.get(exp.category) || 0) + exp.amount);
    }
  });

  const expensesByCategory = Array.from(categoryMap.entries())
    .map(([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length]
    }))
    .filter((entry) => entry.value > 0);


  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Desempenho</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium">Total Receitas</h3>
          <p className="text-2xl font-bold text-green-400 mt-1">
            {formatCurrency(locacaoRevenue + guinchoRevenue)}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium">Total Despesas</h3>
          <p className="text-2xl font-bold text-red-400 mt-1">
            {formatCurrency(locacaoExpense + guinchoExpense)}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium">Lucro Total</h3>
          <p className="text-2xl font-bold text-blue-400 mt-1">
            {formatCurrency((locacaoRevenue + guinchoRevenue) - (locacaoExpense + guinchoExpense))}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium">Margem</h3>
          <p className="text-2xl font-bold text-purple-400 mt-1">
            {totalMargin.toFixed(2)}%
          </p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
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

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Despesas por Categoria</h3>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
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

            <div className="flex flex-col md:flex-col justify-center md:w-1/3 space-y-2">
              {expensesByCategory.map((entry, index) => {
                const total = expensesByCategory.reduce((sum, e) => sum + e.value, 0);
                const percent = ((entry.value / total) * 100).toFixed(0);
                return (
                  <div key={entry.name} className="flex items-center gap-2 text-sm text-gray-700">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium">{entry.name}</span>
                    <span className="text-gray-500">— {percent}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

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