import { Category } from '../Categories/'
import { ItemType } from '../CreatePromenade'

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
  main_image_source: string
  content: ItemType[]
  meta_title?: string
  meta_description?: string
  published: boolean
  publishedAt: string
  userId: number
  categories: Category[]
  extracts: ExtractsPourPromenade[]
}
