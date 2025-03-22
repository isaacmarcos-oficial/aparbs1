"use client";

import Image from "next/image";
import styles from "./postContent.module.css";
import { Post } from "@/types/postTypes";

interface Props {
  post: Post;
}

export default function PostContent({ post }: Props) {
  return (
    <div className="flex flex-col items-center w-full p-8 gap-4">
      <div className="flex flex-col gap-6 max-w-screen-lg items-center justify-center">
        <h2 className="text-3xl font-extrabold text-center text-[#d90000] mt-5">
          {post.title}
        </h2>
        <Image
          alt={post.banner.alt || post.title}
          src={post.banner.url}
          width={1000}
          height={200}
          style={{
            objectFit: "cover",
            maxHeight: "300px",
            minWidth: "300px",
            overflow: "hidden",
            borderRadius: "12px",
          }}
        />
        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
