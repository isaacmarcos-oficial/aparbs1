import Image from "next/image";

export default function Hero() {
  return (
    <div className="">
      <Image
        src="https://res.cloudinary.com/diqaqpm8y/image/upload/c_fill,w_1700,h_600/v1753098399/Camada-4_gjsmpq.jpg"
        alt="Fachada da oficina mecânica APARBS na cidade de Porteirinha MG"
        className="w-screen object-cover max-h-64 md:max-h-96 lg:max-h-[600px]"
        width={1800}
        height={600}
        quality={100}
      />
    </div>
  )
}