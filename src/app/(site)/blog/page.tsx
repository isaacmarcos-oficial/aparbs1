import PostCard from "./_components/PostCard";

export default function Blog() {
  return (
    <div className="flex flex-col items-center w-full mt-10">
      <h1 className="text-[#d90000] mb-8 text-center text-4xl font-extrabold">
        Blog
      </h1>
      <div className="flex flex-col gap-4 w-full max-w-screen-xl px-4">
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
}