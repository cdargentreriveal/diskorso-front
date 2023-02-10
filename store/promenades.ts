import { defineStore } from 'pinia'

export const usePromenadeStore = defineStore('categoryStore', {
  state: () => {
    return { count: 2 }
  },
})
