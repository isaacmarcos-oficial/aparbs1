import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function PostCard() {
  return (
    <Link href="/blog/post1">
      <Card className="w-full h-52 flex hover:border-[#d90000] transition-all">
        <Image
          alt="Post 1"
          src="https://www.aparbs.com.br/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F141952%2F1725906402-9ba94b1e-23da-4e2c-95fe-82e420c5214c-troca-de-filtro-de-ar-condicionado.jpg&w=640&q=75"
          width={300}
          height={200}
          style={{ objectFit: "cover", minWidth: "300px", overflow: "hidden", borderRadius: "11px 0px 0px 11px" }}

        />
        <div className="p-4">
          <h2 className="text-xl font-bold ">Post 1</h2>
          <p className="line-clamp-5 text-base tracking-wide">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit doloribus nesciunt, consequatur dolor doloremque veniam in autem voluptatum architecto esse sapiente rem quidem enim! Ipsam reiciendis eos consequatur id esse.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit doloribus nesciunt, consequatur dolor doloremque veniam in autem voluptatum architecto esse sapiente rem quidem enim! Ipsam reiciendis eos consequatur id esse.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit doloribus nesciunt, consequatur dolor doloremque veniam in autem voluptatum architecto esse sapiente rem quidem enim! Ipsam reiciendis eos consequatur id esse.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit doloribus nesciunt, consequatur dolor doloremque veniam in autem voluptatum architecto esse sapiente rem quidem enim! Ipsam reiciendis eos consequatur id esse.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit doloribus nesciunt, consequatur dolor doloremque veniam in autem voluptatum architecto esse sapiente rem quidem enim! Ipsam reiciendis eos consequatur id esse.
          </p>
        </div>
      </Card>
    </Link>
  )
}