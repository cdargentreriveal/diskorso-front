import { defineStore } from 'pinia'
import { User, UserToEdit } from '~~/types/User'

export const useUserStore = defineStore('userStore', {
  state: (): { currentUser: User | null; listUser: any } => ({
    currentUser: null,
    listUser: [],
  }),
  actions: {
    setUser(newUser: User | null) {
      this.currentUser = newUser
    },
    setListUserToEdit(list: any) {
      this.listUser = list
    },
  },
})
