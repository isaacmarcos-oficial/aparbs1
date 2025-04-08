'use client';

import { useState } from "react";
import { CouponForm } from "./couponForm";
import { CouponList } from "./couponList";
import { SearchBar } from "./searchBar";
import { Ticket } from "lucide-react";
import { CouponFormDataType, CouponType, SearchFiltersType } from "@/types/campaignTypes";

const usedCouponNumbers = new Set<number>();

function generateUniqueCouponNumber(): number {
  let number: number;
  do {
    number = Math.floor(Math.random() * 90000) + 10000;
  } while (usedCouponNumbers.has(number));

  usedCouponNumbers.add(number);
  return number;
}

function calculateTotalCoupons(purchaseValue: number, hasInstagramPost: boolean): number {
  let totalCoupons = 1;
  if (purchaseValue > 500) totalCoupons += 2;
  else if (purchaseValue > 200) totalCoupons += 1;
  if (hasInstagramPost) totalCoupons += 2;
  return totalCoupons;
}

export function CouponClient() {
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [filters, setFilters] = useState<SearchFiltersType>({
    clientCode: '',
    clientName: '',
    orderNumber: '',
    couponNumber: ''
  });

  const handleCreateCoupon = (formData: CouponFormDataType) => {
    const totalCoupons = calculateTotalCoupons(formData.purchaseValue, formData.hasInstagramPost);
    const newCoupons: CouponType[] = Array.from({ length: totalCoupons }, () => ({
      id: crypto.randomUUID(),
      registrationDate: new Date(),
      isWinner: false,
      isActive: true,
      couponNumber: generateUniqueCouponNumber(),
      totalCoupons,
      ...formData
    }));

    setCoupons(prev => [...prev, ...newCoupons]);
  };

  const handleDeleteCoupon = (id: string) => {
    const couponToDelete = coupons.find(c => c.id === id);
    if (!couponToDelete) return;

    setCoupons(prev => prev.filter(c =>
      !(c.clientCode === couponToDelete.clientCode &&
        c.orderNumber === couponToDelete.orderNumber)
    ));
  };

  const handleToggleWinner = (id: string) => {
    setCoupons(prev => prev.map(coupon => {
      if (coupon.id === id) return { ...coupon, isWinner: !coupon.isWinner };
      return coupon.isWinner ? { ...coupon, isWinner: false } : coupon;
    }));
  };

  const handleToggleActive = (id: string) => {
    const couponToToggle = coupons.find(c => c.id === id);
    if (!couponToToggle) return;

    setCoupons(prev => prev.map(coupon =>
      (coupon.clientCode === couponToToggle.clientCode &&
        coupon.orderNumber === couponToToggle.orderNumber)
        ? { ...coupon, isActive: !coupon.isActive }
        : coupon
    ));
  };

  const handleUpdateInstagramPost = (orderNumber: string, clientCode: string) => {
    const existingCoupons = coupons.filter(
      c => c.orderNumber === orderNumber && c.clientCode === clientCode
    );

    if (!existingCoupons.length || existingCoupons[0].hasInstagramPost) return;

    const firstCoupon = existingCoupons[0];
    const currentTotal = firstCoupon.totalCoupons;
    const newTotal = calculateTotalCoupons(firstCoupon.purchaseValue, true);
    const additionalCoupons = newTotal - currentTotal;
    if (additionalCoupons <= 0) return;

    const newCoupons: CouponType[] = Array.from({ length: additionalCoupons }, () => ({
      id: crypto.randomUUID(),
      clientCode: firstCoupon.clientCode,
      clientName: firstCoupon.clientName,
      orderNumber: firstCoupon.orderNumber,
      purchaseValue: firstCoupon.purchaseValue,
      hasInstagramPost: true,
      registrationDate: new Date(),
      isWinner: false,
      isActive: firstCoupon.isActive,
      couponNumber: generateUniqueCouponNumber(),
      totalCoupons: newTotal
    }));

    const updatedCoupons = coupons.map(coupon =>
      (coupon.orderNumber === orderNumber && coupon.clientCode === clientCode)
        ? { ...coupon, hasInstagramPost: true, totalCoupons: newTotal }
        : coupon
    );

    setCoupons([...updatedCoupons, ...newCoupons]);
  };

  const filteredCoupons = coupons.filter(coupon => {
    const matchesClientCode = coupon.clientCode.toLowerCase().includes(filters.clientCode.toLowerCase());
    const matchesClientName = coupon.clientName.toLowerCase().includes(filters.clientName.toLowerCase());
    const matchesOrderNumber = coupon.orderNumber.toLowerCase().includes(filters.orderNumber.toLowerCase());
    const matchesCouponNumber = filters.couponNumber
      ? coupon.couponNumber.toString() === filters.couponNumber
      : true;

    return matchesClientCode && matchesClientName && matchesOrderNumber && matchesCouponNumber;
  });

  return (
    <div className="space-y-8">
      <CouponForm onSubmit={handleCreateCoupon} />
      <SearchBar filters={filters} onFiltersChange={setFilters} />

      {filteredCoupons.length > 0 ? (
        <CouponList
          coupons={filteredCoupons}
          onDelete={handleDeleteCoupon}
          onToggleWinner={handleToggleWinner}
          onToggleActive={handleToggleActive}
          onUpdateInstagramPost={handleUpdateInstagramPost}
        />
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Ticket className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum registro encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">
            {coupons.length === 0
              ? 'Comece adicionando um novo registro usando o formulário acima.'
              : 'Nenhum resultado encontrado para os filtros aplicados.'}
          </p>
        </div>
      )}
    </div>
  );
}
