import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency, getPaymentMethodName } from '@/utils/financials';
import { categoriesLabels, Expense, getCategoriesName, Revenue } from '@/types/transportsType';
import { Card } from '@/components/ui/card';
import { DateRange } from 'react-day-picker';
import { ChartBar } from '@/components/ui/chart-bar';
import { COLORS } from '@/utils/color';
import { MetricCard } from './metricCard';
import { generateMonthlyData, groupByCategory, groupByPaymentMethod, isInRange, parseLocalDate } from '@/utils/performanceUtils';
import PieChartComponent from '@/components/PieChartComponent';

interface PerformanceViewProps {
  revenues: Revenue[];
  expenses: Expense[];
  dateRange: DateRange | undefined;
}

export function PerformanceView({ revenues, expenses, dateRange }: PerformanceViewProps) {

  // const [currentYear, currentMonth] = selectedMonth.split('-').map(Number);
  const filteredRevenues = revenues.filter((r) => isInRange(r.date, dateRange));
  const filteredExpenses = expenses.filter((e) => isInRange(e.date, dateRange));

  // Calculate totals for both services
  const locacaoRevenue = filteredRevenues
    .filter(r => r.service === 'locacao')
    .reduce((sum, r) => sum + r.amount, 0);

  const guinchoRevenue = filteredRevenues
    .filter(r => r.service === 'guincho')
    .reduce((sum, r) => sum + r.amount, 0);

  const locacaoExpense = filteredExpenses
    .filter(e => e.service === 'locacao')
    .reduce((sum, e) => sum + e.amount, 0);

  const guinchoExpense = filteredExpenses
    .filter(e => e.service === 'guincho')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalRevenue = locacaoRevenue + guinchoRevenue;
  const totalExpense = locacaoExpense + guinchoExpense;
  const totalProfit = totalRevenue - totalExpense;
  const totalMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  const serviceComparison = [
    { name: 'Locação', receitas: locacaoRevenue, despesas: locacaoExpense },
    { name: 'Guincho', receitas: guinchoRevenue, despesas: guinchoExpense },
  ];

  const categoryMap = new Map<string, number>();

  filteredExpenses.forEach(exp => {
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

  filteredRevenues.forEach(rev => {
    const method = rev.paymentMethod ?? 'nao_informado';
    paymentMethodMap.set(method, (paymentMethodMap.get(method) || 0) + rev.amount);
  });

  const getPreviousRange = (range: DateRange | undefined): DateRange | undefined => {
    if (!range?.from || !range?.to) return undefined;

    const from = new Date(range.from);
    const to = new Date(range.to);

    const diff = to.getTime() - from.getTime();
    const previousFrom = new Date(from.getTime() - diff);
    const previousTo = new Date(to.getTime() - diff);

    return { from: previousFrom, to: previousTo };
  };

  const previousRange = getPreviousRange(dateRange);

  const previousRevenues = revenues.filter((r) => isInRange(r.date, previousRange));
  const previousExpenses = expenses.filter((e) => isInRange(e.date, previousRange));

  // const previousMonthDate = new Date(currentYear, currentMonth - 2); // -2 porque getMonth() é zero-based
  // const previousYear = previousMonthDate.getFullYear();
  // const previousMonth = previousMonthDate.getMonth();

  // const previousRevenues = revenues.filter((r) => {
  //   const date = parseLocalDate(r.date);
  //   return date.getFullYear() === previousYear && date.getMonth() === previousMonth;
  // });

  // const previousExpenses = expenses.filter((e) => {
  //   const date = parseLocalDate(e.date);
  //   return date.getFullYear() === previousYear && date.getMonth() === previousMonth;
  // });


  const previousRevenueTotal = previousRevenues.reduce((sum, r) => sum + r.amount, 0);
  const previousExpenseTotal = previousExpenses.reduce((sum, e) => sum + e.amount, 0);
  const previousProfit = previousRevenueTotal - previousExpenseTotal;
  const previousMargin = previousRevenueTotal > 0 ? (previousProfit / previousRevenueTotal) * 100 : 0;

  const locacaoExpenses = filteredExpenses.filter(e => e.service === 'locacao');
  const guinchoExpenses = filteredExpenses.filter(e => e.service === 'guincho');
  const locacaoRevenues = filteredRevenues.filter(r => r.service === 'locacao');
  const guinchoRevenues = filteredRevenues.filter(r => r.service === 'guincho');

  const locacaoByCategory = groupByCategory(locacaoExpenses, COLORS);
  const guinchoByCategory = groupByCategory(guinchoExpenses, COLORS);
  const locacaoByPaymentMethod = groupByPaymentMethod(locacaoRevenues, COLORS);
  const guinchoByPaymentMethod = groupByPaymentMethod(guinchoRevenues, COLORS);
  const totalByPaymentMethod = groupByPaymentMethod(filteredRevenues, COLORS);

  const monthlyData = generateMonthlyData(revenues, expenses, parseLocalDate);

  const seriesConfig = [
    { key: 'locacao', label: 'Locação' },
    { key: 'guincho', label: 'Guincho' }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Desempenho</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Receitas"
          value={totalRevenue}
          previousValue={previousRevenueTotal}
          color="text-green-400"
        />
        <MetricCard
          title="Total Despesas"
          value={totalExpense}
          previousValue={previousExpenseTotal}
          color="text-red-400"
        />
        <MetricCard
          title="Lucro Total"
          value={totalProfit}
          previousValue={previousProfit}
          color="text-blue-400"
        />
        <MetricCard
          title="Margem"
          value={totalMargin}
          previousValue={previousMargin}
          unit="percent"
          color="text-purple-400"
        />
      </div>

      {/* Desempenho mensal */}
      <ChartBar
        title="Receita Líquida por Serviço"
        data={monthlyData}
        series={seriesConfig}
      />

      {/* Despesas por categoria */}
      <Card className='p-6'>
        <h3 className="text-xl font-semibold mb-6"> Despesas por categoria</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <PieChartComponent
            title="Locação"
            data={locacaoByCategory}
            getLabel={(key) => getCategoriesName(key as keyof typeof categoriesLabels)}
          />

          <PieChartComponent
            title="Guincho"
            data={guinchoByCategory}
            getLabel={(key) => getCategoriesName(key as keyof typeof categoriesLabels)}
          />

          <PieChartComponent
            title="Total"
            data={expensesByCategory}
            getLabel={(key) => getCategoriesName(key as keyof typeof categoriesLabels)}
          />
        </div>
      </Card>

      {/* Receita por forma de pagamento */}
      <Card className='p-6'>
        <h3 className="text-xl font-semibold mb-6">Receita por Forma de Pagamento</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <PieChartComponent
            title="Locação"
            data={locacaoByPaymentMethod}
            getLabel={getPaymentMethodName}
          />

          <PieChartComponent
            title="Guincho"
            data={guinchoByPaymentMethod}
            getLabel={getPaymentMethodName}
          />

          <PieChartComponent
            title="Total"
            data={totalByPaymentMethod}
            getLabel={getPaymentMethodName}
          />
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