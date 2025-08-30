export type ServiceType = 'locacao' | 'guincho' | 'performance' | 'vehicles';

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

export interface Vehicles {
  id: string;
  model: string;
  plate: string;
  active: boolean;
}

export interface Expense {
  id: string;
  date: string;
  vehicle: string;
  description: string;
  category: string;
  amount: number;
  service: ServiceType;
}