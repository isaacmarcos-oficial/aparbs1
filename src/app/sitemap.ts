import type { MetadataRoute } from 'next'
import { getCatalog } from './actions/catalogActions'
import { DatoResponse, Post } from '@/types/postTypes'
import { client } from '@/lib/datoClient'
import { GET_POSTS } from '@/lib/datoQueries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const catalog = await getCatalog()
  let posts: Post[] = []

  try {
    const data: DatoResponse = await client.request(GET_POSTS)
    posts = data?.allPosts || []
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
  }

  const catalogRoutes = catalog.map((item) => ({
    url: `https://aparbs.com.br/catalogo/${item.slug}`,
    images: [item.image],
    lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://aparbs.com.br/blog/${post.slug}`,
    images: [post.banner.url],
    lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: 'https://aparbs.com.br',
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://aparbs.com.br/blog',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://aparbs.com.br/catalogo',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]

  return [ ...staticRoutes, ...catalogRoutes, ...postRoutes ]
}