export interface Post {
  id: string;
  slug: string;
  banner: {
    url: string,
    alt: string
  };
  title: string;
  content: string;
  updatedAt: string;
}

export interface Partner {
  id: string;
  business: string;
  image: {
    url: string
  }
}

export interface DatoResponse {
  allPosts: Post[];
  post: Post;
  allPartners: Partner[]
}

