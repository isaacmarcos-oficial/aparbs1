'use client';

import { useState } from "react";
import { CouponForm } from "./couponForm";
import { CouponList } from "./couponList";
import { SearchBar } from "./searchBar";
import { Ticket } from "lucide-react";
import { CouponFormDataType, CouponType, SearchFiltersType } from "@/types/campaignTypes";

const usedCouponNumbers = new Set<number>();

function calculateTotalCoupons(purchaseValue: number, hasInstagramPost: boolean): number {
  let totalCoupons = 1;
  if (purchaseValue > 500) totalCoupons += 2;
  else if (purchaseValue > 200) totalCoupons += 1;
  if (hasInstagramPost) totalCoupons += 2;
  return totalCoupons;
}

export function CouponClient({
  coupons: initialCoupons,
  campaignId
}: {
  coupons: CouponType[];
  campaignId: string;
}) {
  const [coupons, setCoupons] = useState<CouponType[]>(initialCoupons || []);
  const [filters, setFilters] = useState<SearchFiltersType>({
    clientCode: '',
    clientName: '',
    orderNumber: '',
    couponNumber: ''
  });

  const generateCouponNumbers = (total: number): number[] => {
    const result: number[] = [];
    while (result.length < total) {
      const number = Math.floor(Math.random() * 90000) + 10000;
      if (!usedCouponNumbers.has(number)) {
        usedCouponNumbers.add(number);
        result.push(number);
      }
    }
    return result;
  };

  const handleCreateCoupon = (formData: CouponFormDataType) => {
    const totalCoupons = calculateTotalCoupons(formData.purchaseValue, formData.hasInstagramPost);
    const numbers = generateCouponNumbers(totalCoupons);

    const newCoupon: CouponType = {
      id: crypto.randomUUID(),
      registrationDate: new Date(),
      isWinner: false,
      isActive: true,
      couponNumber: numbers,
      ...formData
    };

    setCoupons(prev => [...prev, newCoupon]);
  };

  const handleDeleteCoupon = async (id: string) => {
    const couponToDelete = coupons.find(c => c.id === id);
    if (!couponToDelete) return;

    try {
      const res = await fetch(`/api/coupons/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error("Erro ao deletar cupom");

      setCoupons(prev => prev.filter(c =>
        !(c.clientCode === couponToDelete.clientCode &&
          c.orderNumber === couponToDelete.orderNumber)
      ));
    } catch (error) {
      console.error("Erro ao excluir cupom:", error);
    }
  };

  const handleToggleWinner = async (id: string) => {
    const coupon = coupons.find(c => c.id === id);
    if (!coupon) return;

    const newIsWinner = !coupon.isWinner;

    try {
      const res = await fetch(`/api/coupons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isWinner: newIsWinner }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar isWinner");

      const updated = await res.json();

      setCoupons(prev => prev.map(c =>
        c.id === id ? updated : (newIsWinner ? { ...c, isWinner: false } : c)
      ));
    } catch (error) {
      console.error("Erro ao atualizar ganhador:", error);
    }
  };

  const handleToggleActive = async (id: string) => {
    const couponToToggle = coupons.find(c => c.id === id);
    if (!couponToToggle) return;

    const newIsActive = !couponToToggle.isActive;

    try {
      const res = await fetch(`/api/coupons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newIsActive }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar isActive");

      const updated = await res.json();

      setCoupons(prev =>
        prev.map(c =>
          (c.clientCode === couponToToggle.clientCode && c.orderNumber === couponToToggle.orderNumber)
            ? updated
            : c
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar ativo:", error);
    }
  };

  const handleUpdateInstagramPost = async (orderNumber: string, clientCode: string) => {
    const targetCoupon = coupons.find(
      c => c.orderNumber === orderNumber && c.clientCode === clientCode
    );

    if (!targetCoupon || targetCoupon.hasInstagramPost) return;

    try {
      const res = await fetch(`/api/coupons/${targetCoupon.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error("Erro ao atualizar cupom no backend.");

      const updatedCoupon = await res.json();

      // Atualiza o estado local com os dados retornados do servidor
      setCoupons(prev =>
        prev.map(c =>
          c.id === updatedCoupon.id ? updatedCoupon : c
        )
      );
    } catch (err) {
      console.error("Erro ao marcar cupom com Instagram:", err);
    }
  };

  const filteredCoupons = coupons.filter(coupon => {
    const matchesClientCode = coupon.clientCode.toLowerCase().includes(filters.clientCode.toLowerCase());
    const matchesClientName = coupon.clientName.toLowerCase().includes(filters.clientName.toLowerCase());
    const matchesOrderNumber = coupon.orderNumber.toLowerCase().includes(filters.orderNumber.toLowerCase());
    const matchesCouponNumber = filters.couponNumber
      ? coupon.couponNumber.includes(Number(filters.couponNumber))
      : true;

    return matchesClientCode && matchesClientName && matchesOrderNumber && matchesCouponNumber;
  });

  return (
    <div className="space-y-8">
      <CouponForm campaignId={campaignId} onSubmit={handleCreateCoupon} />
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
