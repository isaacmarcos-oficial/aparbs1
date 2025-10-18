export async function uploadToCloudinary(base64Image: string) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = "aparbssite"

  const formData = new FormData();
  formData.append("file", base64Image);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Erro ao enviar imagem para o Cloudinary");
  }

  const webpUrl = data.secure_url.replace("/upload/", "/upload/f_webp/")
  return webpUrl
  // return data.secure_url as string;
}