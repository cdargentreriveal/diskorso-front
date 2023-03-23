import { Promenade } from '../Promenades'

export interface User {
  id: number
  username: string
  email: string
  role: string
  promenades?: Promenade[]
}
