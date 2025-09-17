import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/utils/financials';
import React from 'react';

interface MetricCardProps {
  title: string;
  value: number;
  previousValue?: number;
  unit?: 'currency' | 'percent' | 'points';
  color?: string;
}

export function MetricCard({
  title,
  value,
  previousValue,
  unit = 'currency',
  color = 'text-gray-800'
}: MetricCardProps) {
  const isPositive = previousValue !== undefined ? value >= previousValue : true;
  const delta = previousValue !== undefined ? value - previousValue : 0;

  const formattedValue =
    unit === 'currency'
      ? formatCurrency(value)
      : unit === 'percent'
      ? `${value.toFixed(2)}%`
      : `${value.toFixed(2)} pts`;

  const formattedDelta =
    unit === 'currency'
      ? formatCurrency(delta)
      : unit === 'percent'
      ? `${delta.toFixed(2)}%`
      : `${delta.toFixed(2)} pts`;

  return (
    <Card className="p-6">
      <h3 className="text-sm font-medium">{title}</h3>
      <p className={`text-2xl font-bold mt-1 ${color}`}>
        {formattedValue}
      </p>
      {previousValue !== undefined && (
        <p className="text-xs text-gray-500 mt-1">
          {isPositive ? '▲' : '▼'} {formattedDelta} vs mês anterior
        </p>
      )}
    </Card>
  );
}