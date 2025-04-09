// utils/downloadTemplate.ts
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function downloadCouponTemplate() {
  const headers = [
    ["Código do Cliente", "CPF", "Nome do Cliente", "Nº OS/VB", "Valor"],
  ];

  const exampleRow = [
    ["1234", "00000000000", "João da Silva", "VB123", 250.00,],
  ];

  const worksheet = XLSX.utils.aoa_to_sheet([...headers, ...exampleRow]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "ModeloCupons");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(blob, "modelo_cupons.xlsx");
}
