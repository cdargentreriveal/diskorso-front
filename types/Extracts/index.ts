interface Category {
  slug: string
  title: string
  color: string
}
interface Promenade {
  id: number
  main_image: string
  title: string
  slug: string
}
export interface ExtractFetched {
  blocked: boolean
  categories: Category[]
  content: string
  createdAt: string
  description: string
  id: number
  name: string
  promenades: Promenade[]
  source: string
  status: string
  updatedAt: Date
  used_in_article: boolean
  user_id: number
}
