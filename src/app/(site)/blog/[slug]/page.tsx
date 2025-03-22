import { client } from "@/lib/datoClient";
import { GET_POST_BY_ID } from "@/lib/datoQueries";
import { DatoResponse } from "@/types/postTypes";
import PostContent from "./ContentPost";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post = null;

  try {
    const data: DatoResponse = await client.request(GET_POST_BY_ID, { slug });
    post = data?.post || null;
  } catch (error) {
    console.error("Erro ao buscar o post:", error);
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center w-full p-8 gap-4">
        <h2 className="text-3xl font-extrabold text-center text-[#d90000] mt-5">
          Post não encontrado
        </h2>
      </div>
    );
  }

  // Passa os dados para o Client Component
  return <PostContent post={post} />;
}
