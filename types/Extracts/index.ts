interface Category {
  slug: string
  title: string
  color: string
}

export interface ExtractFetched {
  blocked: boolean
  categories: Category[]
  content: string
  createdAt: string
  description: string
  id: number
  name: string
  promenades: [number]
  source: string
  status: string
  updatedAt: string
  user_id: number
}
