import { CouponType } from "@/types/campaignTypes";

export function exportToCSV(coupons: CouponType[], filename: string) {
  // Define CSV headers
  const headers = [
    'Código do Cliente',
    'Nome do Cliente',
    'Nº OS/VB',
    'Valor da Compra',
    'Post no Instagram',
    'Data de Registro',
    'Nº do Cupom',
    'Total de Cupons',
    'Status',
    'Ganhador'
  ];

  // Transform data to CSV format
  const csvData = coupons.map(coupon => [
    coupon.clientCode,
    coupon.clientName,
    coupon.orderNumber,
    coupon.purchaseValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    coupon.hasInstagramPost ? 'Sim' : 'Não',
    new Date(coupon.registrationDate).toLocaleDateString(),
    `${coupon.couponNumber}/${coupon.totalCoupons}`,
    coupon.totalCoupons,
    coupon.isActive ? 'Ativo' : 'Inativo',
    coupon.isWinner ? 'Sim' : 'Não'
  ]);

  // Combine headers and data
  const csvContent = [
    headers.join(','),
    ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  // Create and trigger download
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}