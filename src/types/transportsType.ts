export type ServiceType = 'locacao' | 'guincho' | 'performance' | 'vehicles';

export const categoriesLabels = {
  combustivel: 'Combustível',
  manutencao: 'Manutenção',
  seguro: 'Seguro',
  pedagio: 'Pedagio',
  alimentacao: 'Alimentação',
  servicos_terceiros: 'Serviços Terceiros',
  rastreador: 'Rastreador',
  financiamento: 'Financiamento',
  impostos: 'Impostos',
  salarios: 'Salários',
  outros: 'Outros'
};
export type Categories = keyof typeof categoriesLabels;
export const getCategoriesName = (category: keyof typeof categoriesLabels): string => {
  return categoriesLabels[category];
};
export const categories = Object.keys(categoriesLabels) as (keyof typeof categoriesLabels)[];

export const paymentMethodLabels = {
  cartao_credito: 'Cartão de Crédito',
  cartao_debito: 'Cartão de Débito',
  transferencia: 'Transferência',
  carteira: 'Carteira',
  dinheiro: 'Dinheiro',
  boleto: 'Boleto',
  pix: 'PIX',
} as const;
export type PaymentMethod = keyof typeof paymentMethodLabels;

export interface Revenue {
  id: string;
  date: string;
  osnumber: string;
  client: string;
  vehicle: string;
  plate: string;
  paymentmethod: PaymentMethod;
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