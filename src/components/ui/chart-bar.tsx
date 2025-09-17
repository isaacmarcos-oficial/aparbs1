import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/financials';
import { COLORS } from '@/utils/color';

interface ChartEntry {
  month: string;
  [key: string]: string | number; // permite múltiplas séries além de "month"
}

interface ChartBarProps {
  title: string;
  data: ChartEntry[];
  series: {
    key: string;
    label: string;
    color?: string;
  }[];
}

export function ChartBar({ title, data, series }: ChartBarProps) {
  const seriesWithColors = series.map((s, index) => ({
    ...s,
    color: s.color ?? COLORS[index % COLORS.length]
  }));

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6">{title} { }</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" tickFormatter={(value) => formatCurrency(value)} />
          <Tooltip
            formatter={(value: number, name: string) => [
              formatCurrency(value),
              name.charAt(0).toUpperCase() + name.slice(1)
            ]}
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              color: '#111827'
            }}
          />
          {seriesWithColors.map(({ key, label, color }) => (
            <Bar
              key={key}
              dataKey={key}
              name={label}
              fill={color}
              radius={4}
            />
          ))}

        </BarChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {seriesWithColors.map(({ key, label, color }) => (
          <Badge key={key} variant="secondary" className="flex items-center gap-2 text-sm text-gray-700 uppercase">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="font-medium">{label}</span>
          </Badge>
        ))}
      </div>
    </Card>
  );
}