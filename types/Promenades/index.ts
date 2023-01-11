export interface Promenade {
  id: number
  createdAt: string
  updatedAt: string
  title: string
  slug: string
  summary: string
  main_image: string
  content: JSON
  meta_title?: string
  meta_description?: string
  userId: number
  categories: number[]
  extracts: number[]
}
