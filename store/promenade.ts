import { defineStore } from 'pinia'
import { Promenade } from '~~/types/Promenades'

export const usePromenadeStore = defineStore('promenadeStore', {
  state: (): { selectPromenade: Promenade | null } => ({
    selectPromenade: null,
  }),
  actions: {
    setPromenade(currentPromenade: Promenade | null) {
      this.selectPromenade = currentPromenade
    },
  },
})
