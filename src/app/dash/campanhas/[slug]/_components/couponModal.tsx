import React from 'react';
import { X } from 'lucide-react';
import { CouponType } from '@/types/campaignTypes';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CouponModalProps {
  coupons: CouponType[];
  isOpen: boolean;
  onClose: () => void;
}

export function CouponModal({ coupons, isOpen, onClose }: CouponModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            Cupons do Pedido
          </h3>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </Button>
        </div>
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-md text-sm">
              <p className="">
                <strong>Cliente:</strong> <span className="font-medium">{coupons[0]?.clientName}</span>
              </p>
              <p className="">
                <strong>OS/VB:</strong> <span className="font-medium">{coupons[0]?.orderNumber}</span>
              </p>
              <p className="">
                <strong>Total de Cupons:</strong> <span className="font-medium">{coupons.length}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {coupons.map((coupon) => (
                <Card
                  key={coupon.id}
                  className={`p-3 text-center ${coupon.isWinner
                      ? 'bg-yellow-100 border-2 border-yellow-400'
                      : 'bg-gray-50 border border-gray-200'
                    }`}
                >
                  <span className="text-lg font-bold block">
                    {coupon.couponNumber}
                  </span>
                  {coupon.isWinner && (
                    <span className="text-xs font-medium text-yellow-800">
                      Ganhador
                    </span>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 border-t">
          <Button
            onClick={onClose}
            className="w-full"
          >
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}