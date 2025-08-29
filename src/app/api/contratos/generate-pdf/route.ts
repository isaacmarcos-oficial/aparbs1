import { NextRequest } from "next/server"
import { renderToBuffer } from "@react-pdf/renderer"
import { ContratoPDF } from "@/components/ContratoPDF"

export async function POST(req: NextRequest) {
  const body = await req.json()

  const pdfDoc = ContratoPDF(body)
  const pdfBuffer = await renderToBuffer(pdfDoc)

  // Converte o Buffer para Uint8Array
  const pdfArray = new Uint8Array(pdfBuffer)

  return new Response(pdfArray, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=contrato.pdf",
    },
  })
}