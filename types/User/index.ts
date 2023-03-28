import { Promenade } from '../Promenades'

export interface User {
  id: number
  username: string
  email: string
  role: string
  promenades?: Promenade[]
  picture: string
  createdAt: string
  publishedPromenadesCount: number
  unpublishedPromenadesCount: number
  usedExtractsCount: number
  totalExtracts: number
}

export interface UserToEdit {
  id: number
  createdAt: string
  userName: string
  email: string
  role: string
  validateEmail: boolean
  blocked: string
}
