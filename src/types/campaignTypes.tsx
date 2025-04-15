export interface CouponType {
  id: string;
  cpf: string;
  clientCode: string;
  clientName: string;
  orderNumber: string;
  purchaseValue: number;
  hasInstagramPost: boolean;
  registrationDate: Date;
  saleDate: Date;
  isWinner: boolean;
  isActive: boolean;
  couponNumber: number[];
}

export interface CouponFormDataType {
  campaignId: string
  cpf: string;
  clientCode: string;
  clientName: string;
  orderNumber: string;
  purchaseValue: number;
  hasInstagramPost: boolean;
  saleDate: Date;
}

export interface SearchFiltersType {
  clientCode: string;
  clientName: string;
  orderNumber: string;
  couponNumber: string;
}

export interface Campaign {
  id: string;
  title: string;
  status: "finished" | "ongoing" | "programmed";
  name: string;
  description?: string;
  startDate: string; // ou Date se preferir
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  coupons: CouponType[];
}
