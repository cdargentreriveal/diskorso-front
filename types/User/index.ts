import { Promenade } from '../Promenades'

export interface User {
  id: number
  username: string
  email: string
  role: string
  promenades?: Promenade[]
  picture: string
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
