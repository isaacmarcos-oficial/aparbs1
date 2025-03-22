export interface Post {
  id: string;
  slug: string;
  banner: {
    url: string,
    alt: string
  };
  title: string;
  content: string;
}

export interface DatoResponse {
  allPosts: Post[];
  post: Post;
}