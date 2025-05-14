import { NextRequest } from "next/server"
import { renderToBuffer } from "@react-pdf/renderer"
import { ContratoPDF } from "@/components/ContratoPDF"

export async function POST(req: NextRequest) {
  const body = await req.json()

  const pdfDoc = ContratoPDF(body) // <-- aqui é uma função normal, sem JSX direto
  const pdfBuffer = await renderToBuffer(pdfDoc)

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=contrato.pdf",
    },
  })
}
