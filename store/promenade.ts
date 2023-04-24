import { defineStore } from 'pinia'
import { Promenade } from '~~/types/Promenades'

export const usePromenadeStore = defineStore('promenadeStore', {
  state: (): {
    selectPromenade: Promenade | null
    creationTitlePromenade: string
    creationSlugPromenade: string
    creationSummaryPromenade: string
  } => ({
    selectPromenade: null,
    creationTitlePromenade: '',
    creationSlugPromenade: '',
    creationSummaryPromenade: '',
  }),
  actions: {
    setPromenade(currentPromenade: Promenade | null) {
      this.selectPromenade = currentPromenade
    },
    setCreationTitlePromenade(title: string) {
      this.creationTitlePromenade = title
      this.creationSlugPromenade = title.replace(/ /g, '-')
    },
    setCreationSummaryPromenade(summary: string) {
      this.creationSummaryPromenade = summary
    },
  },
})
