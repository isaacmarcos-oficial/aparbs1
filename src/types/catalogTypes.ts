export interface Catalog {
  id: number;
  slug: string;
  name: string;
  image?: string;
  category?: string;
  description?: string;
  pesobruto?: string
  pesoliquido?: string
  metroscubicos?: string
  altura?: string
  largura?: string
  profundidade?: string
  marca?: string
}