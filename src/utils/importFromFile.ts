import { CouponFormDataType } from '@/types/campaignTypes';
import { read, utils } from 'xlsx';

export async function importFromFile(file: File, campaignId: string): Promise<CouponFormDataType[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonData = utils.sheet_to_json<Record<string, string | number | boolean | undefined>>(worksheet);

        const mappedData: CouponFormDataType[] = jsonData.map(row => {
          const clientCode = row['Código do Cliente'] || row['codigo_cliente'];
          const cpf = row['CPF'] || '';
          const clientName = row['Nome do Cliente'] || row['nome_cliente'];
          const orderNumber = row['Nº OS/VB'] || row['numero_os'];
          const purchaseValue = row['Valor'] || 0;

          if (!clientCode || !clientName || !orderNumber || !cpf) {
            throw new Error('Formato de arquivo inválido. Verifique se as colunas estão corretas.');
          }

          return {
            campaignId,
            clientCode: String(clientCode),
            clientName: String(clientName),
            orderNumber: String(orderNumber),
            cpf: String(cpf),
            purchaseValue: Number(purchaseValue),
            hasInstagramPost: false, // fixo
          };
        });

        resolve(mappedData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Erro ao ler o arquivo'));
    };

    reader.readAsBinaryString(file);
  });
}
