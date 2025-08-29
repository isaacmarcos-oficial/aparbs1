export type ServiceType = 'locacao' | 'guincho' | 'performance';

export type PaymentMethod = 'dinheiro' | 'cartao_credito' | 'cartao_debito' | 'pix' | 'transferencia';

export type VehicleType = 'hilux' | 'voyage' | 'gol' | 'guincho';


export interface Revenue {
  id: string;
  date: string;
  osNumber: string;
  client: string;
  vehicle: VehicleType;
  plate: string;
  paymentMethod: PaymentMethod;
  amount: number;
  service: ServiceType;
}

export interface Expense {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  service: ServiceType;
}