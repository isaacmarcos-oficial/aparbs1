import Image from "next/image";

export default function Hero() {
  return (
    <div className="">
      <Image
        src="https://res.cloudinary.com/diqaqpm8y/image/upload/v1739193431/Fachada_b0wrxc.jpg"
        alt="Fachada da oficina mecânica APARBS na cidade de Porteirinha MG"
        className="w-screen object-cover max-h-64 md:max-h-96 lg:max-h-[600px]"
        width={1614}
        height={1291}
      />
    </div>
  )
}