import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/financials';

interface CategoryEntry {
  name: string;
  value: number;
  color: string;
}

interface CategoryPieChartProps {
  title: string;
  data: CategoryEntry[];
  getLabel: (key: string) => string;
}

export default function PieChartComponent({ title, data, getLabel }: CategoryPieChartProps) {
  const total = data.reduce((sum, e) => sum + e.value, 0);

  return (
    <div className="flex flex-col p-6">
      <h3 className="text-xl font-semibold mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              formatCurrency(value),
              getLabel(name)
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

      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {data
          .sort((a, b) => b.value - a.value)
          .map((entry) => {
            const percent = ((entry.value / total) * 100).toFixed(0);
            return (
              <Badge key={entry.name} variant="secondary" className="flex items-center gap-2 text-sm text-gray-700 uppercase">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="font-medium">{getLabel(entry.name)} {formatCurrency(entry.value)}</span>
                <span className="text-gray-500">— {percent}%</span>
              </Badge>
            );
          })}
      </div>
    </div>
  );
}