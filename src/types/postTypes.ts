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

export interface Service {
  id: string;
  slug: string;
  title: string;
  icon: string
  shortdescription: string;
  introduction: string;
  whatis: string;
  whatinvolves: string
  whydo: string
  whentodo: string;
  howwedo: string;
  whychooseus: string;
  faq: string
}

export interface Vacancy {
  id: string;
  title: string;
  link: string
}

export interface DatoResponse {
  allPosts: Post[];
  post: Post;
  allServices: Service[]
  service: Service
  allPartners: Partner[]
  allVacancies: Vacancy[]
}