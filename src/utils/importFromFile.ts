import { CouponFormDataType } from '@/types/campaignTypes';
import { read, utils } from 'xlsx';



export async function importFromFile(file: File, campaignId: string): Promise<CouponFormDataType[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        console.log("Dados recebidos:", data);
        const workbook = read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonData = utils.sheet_to_json<Record<string, string | number | boolean | undefined | string>>(worksheet);

        const mappedData: CouponFormDataType[] = jsonData.map(row => {
          const clientCode = row['CODIGO_CLIENTE'] || row['codigo_cliente'];
          const cpf = row['CPF'] || '';
          const clientName = row['NOME_CLIENTE'] || row['nome_cliente'];
          const orderNumber = row['N_VENDA'] || row['numero_os'];
          const purchaseValue = row['VALOR'] || 0;
          const saleDateRaw = row['DTVENDA'] || row['data_venda'];

          console.log("Dados mapeados:", clientCode, clientName, orderNumber, cpf, purchaseValue, saleDateRaw);

          if (!clientCode || !clientName || !orderNumber || !cpf || !purchaseValue) {
            throw new Error('Formato de arquivo inválido. Verifique se as colunas estão corretas.');
          }

          if (!saleDateRaw) {
            throw new Error('Formato de arquivo inválido. Verifique se a Data da Venda está informada.');
          }

          let saleDate: Date;

          if (typeof saleDateRaw === 'number') {
            // Se for número, trata como serial do Excel
            saleDate = new Date((saleDateRaw - 25569) * 86400090);
          } else {
            // Se for string, converte para formato ISO
            const saleDateStr = String(saleDateRaw).trim();
            const saleDateISO = saleDateStr.includes(' ') ? saleDateStr.replace(' ', 'T') : saleDateStr;
            // Se não houver offset, remover o offset para considerar GMT-0
            // Neste caso, utilizamos diretamente a string convertida
            saleDate = new Date(saleDateISO);
          }

          return {
            campaignId,
            clientCode: String(clientCode),
            clientName: String(clientName),
            orderNumber: String(orderNumber),
            cpf: String(cpf),
            purchaseValue: Number(purchaseValue),
            hasInstagramPost: false, // fixo
            saleDate // já convertido para Date
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
