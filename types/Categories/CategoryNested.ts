import { Promenade } from '../Promenades/index'

export interface CategoryNested {
  id: number
  createdAt: string
  updatedAt: string
  slug: string
  title: string
  color: string
  meta_title: string
  meta_description: string
  promenades: Promenade[]
}
