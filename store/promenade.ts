import { defineStore } from 'pinia'
import { ItemType } from '~~/types/CreatePromenade'
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
    items: ItemType[]
    imageCount: number
    transitionCount: number
    excerptCount: number
  } => ({
    selectPromenade: null,
    creationTitlePromenade: '',
    creationSlugPromenade: '',
    creationSummaryPromenade: '',
    creationMainImagePromenade: '',
    mainImage: '',
    mainImageToUpload: new FormData(),
    items: [],
    imageCount: 0,
    transitionCount: 0,
    excerptCount: 0,
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
    pushItem(item: ItemType) {
      this.items.push(item)
    },
    incrementCount(type: 'image' | 'excerpt' | 'transition') {
      switch (type) {
        case 'image':
          this.imageCount++
          break
        case 'excerpt':
          this.excerptCount++
          break
        case 'transition':
          this.transitionCount++
          break
        default:
          // eslint-disable-next-line no-console
          console.log(`Type invalide : ${type}`)
          break
      }
    },
    decrementCount(type: 'image' | 'excerpt' | 'transition') {
      switch (type) {
        case 'image':
          this.imageCount--
          break
        case 'excerpt':
          this.excerptCount--
          break
        case 'transition':
          this.transitionCount--
          break
        default:
          // eslint-disable-next-line no-console
          console.log(`Type invalide : ${type}`)
          break
      }
    },
    clearItems() {
      this.items = []
    },
  },
})
