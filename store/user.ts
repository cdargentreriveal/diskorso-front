import { defineStore } from 'pinia'
import { User } from '~~/types/User'

export const useUserStore = defineStore('userStore', {
  state: (): { currentUser: User | null } => ({
    currentUser: null,
  }),
  actions: {
    setUser(newUser: User) {
      this.currentUser = newUser
    },
  },
})
