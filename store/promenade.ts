import { defineStore } from 'pinia'
import { Promenade } from '~~/types/Promenades'

export const usePromenadeStore = defineStore('promenadeStore', {
  state: (): {
    selectPromenade: Promenade | null
    creationTitlePromenade: string
    creationSlugPromenade: string
    creationSummaryPromenade: string
    creationMainImagePromenade: string
    mainImage: string
    mainImageToUpload: FormData
  } => ({
    selectPromenade: null,
    creationTitlePromenade: '',
    creationSlugPromenade: '',
    creationSummaryPromenade: '',
    creationMainImagePromenade: '',
    mainImage: '',
    mainImageToUpload: new FormData(),
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
    setCreationMainImagePromenade(summary: string) {
      this.creationMainImagePromenade = summary
    },
    setMainImage(mainImage: string) {
      this.mainImage = mainImage
    },
    setmainImageToUpload(mainImageToUpload: FormData) {
      this.mainImageToUpload = mainImageToUpload
    },
  },
})
