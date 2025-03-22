import PostCard from "./_components/PostCard";
import { GET_POSTS } from "@/lib/datoQueries";
import { client } from "@/lib/datoClient";
import { DatoResponse, Post } from "@/types/postTypes";

export const dynamic = "force-dynamic";

export default async function Blog() {
  let posts: Post[] = [];

  try {
    const data: DatoResponse = await client.request(GET_POSTS);
    posts = data?.allPosts || [];
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
  }


  return (
    <div className="flex flex-col items-center w-full mt-10">
      <h1 className="text-[#d90000] mb-8 text-center text-4xl font-extrabold">
        Blog
      </h1>
      <div className="flex flex-col gap-4 w-full max-w-screen-xl px-4">
        {posts.length > 0 ? (
          posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhum post encontrado.</p>
        )}
      </div>
    </div>
  );
}