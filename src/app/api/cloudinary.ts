import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const folder = "partners"; // Nome da pasta no Cloudinary

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/folder/${folder}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar imagens do Cloudinary");
    }

    const data = await response.json();

    // Formatando os dados para o frontend
    const images = data.resources.map((img: {public_id: string; secure_url: string}) => ({
      id: img.public_id,
      url: img.secure_url,
    }));

    res.status(200).json(images);
  } catch (error) {
    console.error("Erro ao buscar imagens do Cloudinary:", error);
    res.status(500).json({ error: "Erro ao carregar imagens" });
  }
}
