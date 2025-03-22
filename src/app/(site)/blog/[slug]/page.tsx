import Image from "next/image";
import { contentPost } from "./ContextPost";
import styles from "./postContent.module.css";

export default function PostPage() {

  return (
    <div className="flex flex-col items-center w-full p-8 gap-4 ">
      <div className="flex flex-col gap-6 max-w-screen-lg items-center justify-center">
        <h2 className="text-3xl font-extrabold text-center text-[#d90000] mt-5">
          Reparo de ar condicionado para carros: Entenda custos, serviços e muito mais
        </h2>
        <Image
          alt="Post 1"
          src="https://www.aparbs.com.br/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F141952%2F1725906402-9ba94b1e-23da-4e2c-95fe-82e420c5214c-troca-de-filtro-de-ar-condicionado.jpg&w=640&q=75"
          width={1000}
          height={200}
          style={{ objectFit: "cover", maxHeight: "300px", minWidth: "300px", overflow: "hidden", borderRadius: "12px" }}
        />
        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: contentPost }}
        />
      </div>
    </div>
  )
}