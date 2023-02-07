import { Category } from '../Categories/'

interface ExtractsPourPromenade {
  id: number
}

interface User {
  username: string
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
  content: string
  meta_title?: string
  meta_description?: string
  published: boolean
  publishedAt: string
  userId: number
  categories: Category[]
  extracts: ExtractsPourPromenade[]
}
