import { CouponFormDataType } from '@/types/campaignTypes';
import { read, utils } from 'xlsx';

export async function importFromFile(file: File): Promise<CouponFormDataType[]> {
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
          // Try different possible column names
          const clientCode = row['Código do Cliente'] || row['Codigo do Cliente'] || row['codigo_cliente'] || row['CÓDIGO DO CLIENTE'];
          const clientName = row['Nome do Cliente'] || row['nome_cliente'] || row['NOME DO CLIENTE'];
          const orderNumber = row['Nº OS/VB'] || row['N OS/VB'] || row['numero_os'] || row['Nº OS ou VB'] || row['OS/VB'];
          const purchaseValue = row['Valor'] || row['VALOR'] || row['valor_compra'] || row['Valor da Compra'] || 0;
          const hasInstagramPost = row['Post Instagram'] || row['INSTAGRAM'] || row['instagram'] || false;

          if (!clientCode || !clientName || !orderNumber) {
            throw new Error('Formato de arquivo inválido. Verifique se as colunas estão corretas.');
          }

          return {
            clientCode: String(clientCode),
            clientName: String(clientName),
            orderNumber: String(orderNumber),
            purchaseValue: Number(purchaseValue) || 0,
            hasInstagramPost: Boolean(hasInstagramPost)
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