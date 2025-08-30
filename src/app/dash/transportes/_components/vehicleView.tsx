import React from 'react';
import { Car, Plus, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/utils/financials';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Expense, Revenue, Vehicles } from '@/types/transportsType';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

interface VehicleViewProps {
  vehicles: Vehicles[];
  revenues: Revenue[];
  expenses: Expense[];
  toggleVehicleStatus: (vehicleId: string, active: boolean) => void;
}

export function VehicleView({ vehicles, revenues, expenses, toggleVehicleStatus }: VehicleViewProps) {

  // Revenues
  const getVehicleRevenue = (plate: string) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const total = revenues
      .filter((rev) => {
        const revDate = new Date(rev.date);
        return (
          rev.plate === plate &&
          revDate.getMonth() === currentMonth &&
          revDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, rev) => sum + rev.amount, 0);

    return total;
  };

  const getVehicleExpenses = (vehicleKey: string) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return expenses
      .filter((exp) => {
        const expDate = new Date(exp.date);
        return (
          exp.vehicle === vehicleKey &&
          expDate.getMonth() === currentMonth &&
          expDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  // Número de ordens de serviço (OS)
  const getVehicleOSCount = (plate: string) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return revenues.filter((rev) => {
      const revDate = new Date(rev.date);
      return (
        rev.plate === plate &&
        revDate.getMonth() === currentMonth &&
        revDate.getFullYear() === currentYear
      );
    }).length;
  };

  // Média de receita por dia
  const getVehicleDailyAverage = (plate: string) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const dailyTotals = new Map<string, number>();

    revenues.forEach((rev) => {
      const revDate = new Date(rev.date);
      const key = revDate.toISOString().split('T')[0];

      if (
        rev.plate === plate &&
        revDate.getMonth() === currentMonth &&
        revDate.getFullYear() === currentYear
      ) {
        dailyTotals.set(key, (dailyTotals.get(key) || 0) + rev.amount);
      }
    });

    const totalRevenue = Array.from(dailyTotals.values()).reduce((sum, val) => sum + val, 0);
    const daysWithRevenue = dailyTotals.size;

    return daysWithRevenue > 0 ? totalRevenue / daysWithRevenue : 0;
  };

  const getVehicleProfit = (plate: string, model: string) => {
    const revenue = getVehicleRevenue(plate);
    const expense = getVehicleExpenses(`${model} - ${plate}`);
    return revenue - expense;
  };

  const getVehicleMargin = (plate: string, model: string) => {
    const revenue = getVehicleRevenue(plate);
    const expense = getVehicleExpenses(`${model}-${plate}`);
    return revenue > 0 ? ((revenue - expense) / revenue) * 100 : 0;
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold ">Gestão de Veículos</h3>
        <div className="items-center flex gap-2">
          <Badge className="bg-sky-500 p-2">
            {vehicles.filter(v => v.active === true).length} ativos
          </Badge>
          <Button size={'icon'} className='bg-green-500 hover:bg-green-600/80'>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
        {vehicles.map((vehicle) => (
          <Card
            key={vehicle.id}
            className={`relative p-4 rounded-xl border transition-all duration-300 ${vehicle.active === true
              ? 'bg-green-100/10 border-green-600/30'
              : 'bg-red-600/5 border-red-600/30'
              }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${vehicle.active === true ? 'bg-green-500/10' : 'bg-red-500/20'
                  }`}>
                  <Car className={`w-5 h-5 ${vehicle.active === true ? 'text-green-400' : 'text-red-400'
                    }`} />
                </div>
                <div>
                  <h4 className="font-semibold uppercase text-sm">{vehicle.model}</h4>
                  <p className="text-xs text-muted-foreground">{vehicle.plate}</p>
                </div>
              </div>

              <Switch checked={vehicle.active} onClick={() => toggleVehicleStatus(vehicle.id, !vehicle.active)} />
            </div>

            <div className="">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">OS no mês:</span>
                <span className="font-semibold text-blue-500">
                  {getVehicleOSCount(vehicle.plate)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Receita do Mês:</span>
                <div className={`${vehicle.active === true ? 'text-green-400' : 'text-zinc-400'} flex items-center space-x-1`}>
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-semibold">
                    {formatCurrency(getVehicleRevenue(vehicle.plate))}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Despesas do Mês:</span>
                <span className="font-semibold text-red-500">
                  {formatCurrency(getVehicleExpenses(`${vehicle.model} - ${vehicle.plate}`))}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Lucro Líquido:</span>
                <span className="font-semibold text-blue-500">
                  {formatCurrency(getVehicleProfit(vehicle.plate, vehicle.model))}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Média diária:</span>
                <span className="font-semibold text-indigo-500">
                  {formatCurrency(getVehicleDailyAverage(vehicle.plate))}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Margem:</span>
                <span className="font-semibold text-indigo-500">
                  {getVehicleMargin(vehicle.plate, vehicle.model).toFixed(1)}%
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}