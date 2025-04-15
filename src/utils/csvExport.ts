import { CouponType } from "@/types/campaignTypes";

export function exportToCSV(coupons: CouponType[], filename: string) {
  // Cabeçalhos do CSV
  const headers = [
    'Código do Cliente',
    'Nome do Cliente',
    'Nº OS/VB',
    'Valor da Compra',
    'Post no Instagram',
    'Data de Registro',
    'Data da Venda',
    'Nº(s) do Cupom',
    'Quantidade de Cupons',
    'Status',
    'Ganhador'
  ];

  // Transformar dados dos cupons para o formato do CSV
  const csvData = coupons.map(coupon => [
    coupon.clientCode,
    coupon.clientName,
    coupon.orderNumber,
    coupon.purchaseValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    coupon.hasInstagramPost ? 'Sim' : 'Não',
    new Date(coupon.registrationDate).toLocaleDateString('pt-BR'),
    new Date(coupon.saleDate).toLocaleDateString('pt-BR'),
    coupon.couponNumber.join(' / '), // Agora é array
    coupon.couponNumber.length,       // Quantidade de cupons
    coupon.isActive ? 'Ativo' : 'Inativo',
    coupon.isWinner ? 'Sim' : 'Não'
  ]);

  // Montar o conteúdo CSV
  const csvContent = [
    headers.join(','),
    ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  // Criar e disparar o download
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
