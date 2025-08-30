import { Revenue } from "@/types/transportsType";

export const mockRevenues: Revenue[] = [
  {
    id: '1',
    date: '2025-08-15',
    osNumber: '001',
    client: 'João Silva',
    vehicle: 'hilux',
    plate: 'ABC-1234',
    paymentMethod: 'pix',
    amount: 850.00,
    service: 'locacao'
  },
  {
    id: '2',
    date: '2025-08-18',
    osNumber: '002',
    client: 'Maria Santos',
    vehicle: 'voyage',
    plate: 'DEF-5678',
    paymentMethod: 'cartao_credito',
    amount: 450.00,
    service: 'locacao'
  },
  {
    id: '3',
    date: '2025-08-20',
    osNumber: '003',
    client: 'Pedro Lima',
    vehicle: 'guincho',
    plate: 'GHI-9012',
    paymentMethod: 'dinheiro',
    amount: 300.00,
    service: 'guincho'
  },
  {
    id: '4',
    date: '2025-08-22',
    osNumber: '004',
    client: 'Ana Costa',
    vehicle: 'gol',
    plate: 'JKL-3456',
    paymentMethod: 'pix',
    amount: 380.00,
    service: 'locacao'
  },
  {
    id: '5',
    date: '2025-08-25',
    osNumber: '005',
    client: 'Carlos Mendes',
    vehicle: 'guincho',
    plate: 'MNO-7890',
    paymentMethod: 'transferencia',
    amount: 420.00,
    service: 'guincho'
  }
];
//   {
//     id: '1',
//     date: '2025-08-10',
//     description: 'Abastecimento Hilux',
//     category: 'combustivel',
//     amount: 180.00,
//     service: 'locacao'
//   },
//   {
//     id: '2',
//     date: '2025-08-12',
//     description: 'Revisão Voyage',
//     category: 'manutencao',
//     amount: 320.00,
//     service: 'locacao'
//   },
//   {
//     id: '3',
//     date: '2025-08-14',
//     description: 'Combustível Guincho',
//     category: 'combustivel',
//     amount: 150.00,
//     service: 'guincho'
//   },
//   {
//     id: '4',
//     date: '2025-08-16',
//     description: 'Seguro Mensal',
//     category: 'seguro',
//     amount: 280.00,
//     service: 'locacao'
//   },
//   {
//     id: '5',
//     date: '2025-08-19',
//     description: 'Manutenção Preventiva',
//     category: 'manutencao',
//     amount: 450.00,
//     service: 'guincho'
//   }
// ];