'use client'
import { Card } from "@/components/ui/card";
import { Post } from "@/types/postTypes";
import Image from "next/image";
import Link from "next/link";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="w-full h-52 flex hover:border-[#d90000] transition-all">
        <Image
          alt="Post 1"
          src={post.banner.url}
          width={300}
          height={200}
          style={{ objectFit: "cover", minWidth: "300px", overflow: "hidden", borderRadius: "11px 0px 0px 11px" }}

        />
        <div className="p-4">
          <h2 className="text-xl font-bold ">{post.title}</h2>
          <div className="line-clamp-5 text-base tracking-wide"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </Card>
    </Link>
  )
}