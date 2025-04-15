import React, { useState } from 'react';
import { Download, Instagram, Ticket, CheckCircle, MoreVerticalIcon } from 'lucide-react';
import { exportToCSV } from '@/utils/csvExport';
import { CouponType } from '@/types/campaignTypes';
import { CouponModal } from './couponModal';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

interface CouponListProps {
  coupons: CouponType[];
  onDelete: (id: string) => void;
  onToggleWinner: (id: string) => void;
  onToggleActive: (id: string) => void;
  onUpdateInstagramPost: (orderNumber: string, clientCode: string) => void;
}

export function CouponList({
  coupons,
  onDelete,
  onToggleWinner,
  onToggleActive,
  onUpdateInstagramPost
}: CouponListProps) {
  const [selectedCoupons, setSelectedCoupons] = useState<CouponType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExportCSV = () => {
    const filename = `registros-${new Date().toISOString().split('T')[0]}`;
    exportToCSV(coupons, filename);
  };

  const handleShowCoupons = (orderCoupons: CouponType[]) => {
    setSelectedCoupons(orderCoupons);
    setIsModalOpen(true);
  };

  // Group coupons by order
  const groupedCoupons = coupons.reduce((acc, coupon) => {
    const key = `${coupon.orderNumber}-${coupon.clientCode}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(coupon);
    return acc;
  }, {} as Record<string, CouponType[]>);

  // Get first coupon from each group
  const uniqueOrders = Object.values(groupedCoupons).map(group => group[0]);

  return (
    <Card className="">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase">
            {uniqueOrders.length} pedidos • {coupons.length} cupons
          </h3>
          <Button
            size="sm"
            onClick={handleExportCSV}
            className=""
          >
            <Download size={16} className="mr-2" />
            Exportar
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr className='px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider'>
              <th className="p-3 px-6">
                Código
              </th>
              <th className="p-3 px-6">
                Nome
              </th>
              <th className="p-3 px-6">
                OS/VB
              </th>
              <th className="p-3 px-6">
                Valor
              </th>
              <th className="p-3 px-6">
                IG
              </th>
              <th className="p-3 px-6">
                Cupons
              </th>
              <th className="p-3 px-6">
                Data da venda
              </th>
              <th className="p-3 px-6">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {uniqueOrders.map((order) => {
              const orderCoupons = groupedCoupons[`${order.orderNumber}-${order.clientCode}`];
              const hasWinner = orderCoupons.some(c => c.isWinner);

              return (
                <tr key={`${order.orderNumber}-${order.clientCode}`} className={`${hasWinner ? 'bg-yellow-50' : ''} ${order.isActive ? '' : 'text-red-500 bg-red-100'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono font-medium">{order.clientCode}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium">{order.clientName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium">{order.orderNumber}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.purchaseValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.hasInstagramPost ? (
                      <span className="text-green-600">
                        <CheckCircle size={18} className="" />
                      </span>
                    ) : (
                      <Button
                        onClick={() => onUpdateInstagramPost(order.orderNumber, order.clientCode)}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Instagram size={14} className="mr-1" />
                        Adicionar
                      </Button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      variant="ghost"
                      onClick={() => handleShowCoupons(orderCoupons)}
                      className="inline-flex items-center text-blue-600 hover:text-blue-900"
                    >
                      <Ticket size={16} className="mr-1" />
                      <span className="font-medium">
                        {orderCoupons.reduce((total, coupon) => total + coupon.couponNumber.length, 0)}
                      </span>
                    </Button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.saleDate.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild className='cursor-pointer'>
                          <MoreVerticalIcon size={20} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Button
                              variant="ghost"
                              onClick={() => onToggleWinner(orderCoupons[0].id)}
                              className={`flex w-full items-center justify-start ${hasWinner ? 'text-yellow-600 hover:text-yellow-900' : 'text-gray-600 hover:text-gray-900'
                                }`}
                              title={hasWinner ? 'Remover Ganhador' : 'Marcar como Ganhador'}
                            >
                              {hasWinner ? "Remover Ganhador" : "Marcar como Ganhador"}
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Button
                              variant="ghost"
                              onClick={() => onToggleActive(orderCoupons[0].id)}
                              className={`flex w-full items-center justify-start ${order.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                                }`}
                              title={order.isActive ? 'Desativar' : 'Ativar'}
                            >
                              {order.isActive ? "Desativar" : "Ativar"}
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Button
                              variant="ghost"
                              onClick={() => onDelete(orderCoupons[0].id)}
                              className="flex w-full items-center justify-start text-red-600 hover:text-red-900 "
                              title="Excluir"
                            >
                              Excluir
                            </Button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <CouponModal
        coupons={selectedCoupons}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Card>
  );
}