import { defineStore } from 'pinia'
import { ItemType } from '~~/types/CreatePromenade'
import { Promenade } from '~~/types/Promenades'

export const usePromenadeStore = defineStore('promenadeStore', {
  state: (): {
    selectPromenade: Promenade | null
    creationTitlePromenade: string
    creationSlugPromenade: string
    creationSummaryPromenade: string
    mainImage: string
    mainImageSource: string
    mainImageToUpload: FormData
    items: ItemType[]
    imageCount: number
    transitionCount: number
    excerptCount: number
    mainImageToUploadEdit: FormData
    itemsEdit: ItemType[]
    imageCountEdit: number
    transitionCountEdit: number
    excerptCountEdit: number
    isExcerptAdded: Set<number>
    imagesToDelete: string[]
    imagesToDeleteAllPromenade: string[]
    isBannerImageChanged: boolean
  } => ({
    selectPromenade: null,
    creationTitlePromenade: '',
    creationSlugPromenade: '',
    creationSummaryPromenade: '',
    mainImage: '',
    mainImageSource: '',
    mainImageToUpload: new FormData(),
    items: [],
    imageCount: 0,
    transitionCount: 0,
    excerptCount: 0,
    mainImageToUploadEdit: new FormData(),
    itemsEdit: [],
    imageCountEdit: 0,
    transitionCountEdit: 0,
    excerptCountEdit: 0,
    isExcerptAdded: new Set<number>(),
    imagesToDelete: [],
    imagesToDeleteAllPromenade: [],
    isBannerImageChanged: false,
  }),
  actions: {
    addExtractid(id: number): boolean {
      this.isExcerptAdded.add(id)
      return this.isExcerptAdded.has(id)
    },
    removeExtractid(id: number) {
      const result = this.isExcerptAdded.delete(id)
      return !result
    },
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
    setMainImage(mainImage: string) {
      this.mainImage = mainImage
    },
    setMainImageSource(mainImageSource: string) {
      this.mainImageSource = mainImageSource
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
    setCreationTitlePromenadeEdit(title: string) {
      this.selectPromenade!.title = title
      this.selectPromenade!.slug = title.replace(/ /g, '-')
    },
    setCreationSummaryPromenadeEdit(summary: string) {
      this.selectPromenade!.summary = summary
    },
    setMainImageEdit(mainImage: string) {
      this.selectPromenade!.main_image = mainImage
    },
    setMainImageSourceEdit(mainImageSource: string) {
      this.selectPromenade!.main_image_source = mainImageSource
    },
    setmainImageToUploadEdit(mainImageToUpload: FormData) {
      this.mainImageToUploadEdit = mainImageToUpload
    },
    pushItemEdit(item: ItemType) {
      this.itemsEdit.push(item)
    },
    incrementCountEdit(type: 'image' | 'excerpt' | 'transition') {
      switch (type) {
        case 'image':
          this.imageCountEdit++
          break
        case 'excerpt':
          this.excerptCountEdit++
          break
        case 'transition':
          this.transitionCountEdit++
          break
        default:
          // eslint-disable-next-line no-console
          console.log(`Type invalide : ${type}`)
          break
      }
    },
    decrementCountEdit(type: 'image' | 'excerpt' | 'transition') {
      switch (type) {
        case 'image':
          this.imageCountEdit--
          break
        case 'excerpt':
          this.excerptCountEdit--
          break
        case 'transition':
          this.transitionCountEdit--
          break
        default:
          // eslint-disable-next-line no-console
          console.log(`Type invalide : ${type}`)
          break
      }
    },
    clearItemsEdit() {
      this.itemsEdit = []
    },
    addImageToDeleteArray(image: string) {
      this.imagesToDelete.push(image)
    },
    clearImageToDeleteArray() {
      this.imagesToDelete = []
    },
    addImageToDeleteArrayAllPromenade(image: string) {
      this.imagesToDeleteAllPromenade.push(image)
    },
    clearImageToDeleteArrayAllPromenade() {
      this.imagesToDeleteAllPromenade = []
    },
    setIsBannerImageChanged() {
      this.isBannerImageChanged = true
    },
    unsetIsBannerImageChanged() {
      this.isBannerImageChanged = false
    },
  },
})
