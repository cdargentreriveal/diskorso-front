import { Category } from '../Categories/'

interface ExtractsPourPromenade {
  id: number
}

interface User {
  username: string
  picture: string
  id: number
}
export interface Promenade {
  user: User
  id: number
  createdAt: string
  updatedAt: string
  title: string
  slug: string
  summary: string
  main_image: string
  content: Array<{
    type: string
    imageUrl?: string
    content: string
    key?: string
  }>
  meta_title?: string
  meta_description?: string
  published: boolean
  publishedAt: string
  userId: number
  categories: Category[]
  extracts: ExtractsPourPromenade[]
}
