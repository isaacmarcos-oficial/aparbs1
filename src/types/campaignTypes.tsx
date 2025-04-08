export interface CouponType {
  id: string;
  clientCode: string;
  clientName: string;
  orderNumber: string;
  purchaseValue: number;
  hasInstagramPost: boolean;
  registrationDate: Date;
  isWinner: boolean;
  isActive: boolean;
  couponNumber: number;
  totalCoupons: number;
}

export interface CouponFormDataType {
  clientCode: string;
  clientName: string;
  orderNumber: string;
  purchaseValue: number;
  hasInstagramPost: boolean;
}

export interface SearchFiltersType {
  clientCode: string;
  clientName: string;
  orderNumber: string;
  couponNumber: string;
}