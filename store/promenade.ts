import { defineStore } from 'pinia'
import { ItemType } from '~~/types/CreatePromenade'
import { Promenade } from '~~/types/Promenades'
import { publishPromenade } from '~~/utils/connected'

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
    isExcerptAdded: number[]
    imagesToDelete: string[]
    imagesToDeleteAllPromenade: string[]
    isBannerImageChanged: boolean
    promenades_from_db: Promenade[]
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
    isExcerptAdded: [],
    imagesToDelete: [],
    imagesToDeleteAllPromenade: [],
    isBannerImageChanged: false,
    promenades_from_db: [],
  }),
  getters: {
    filterPromenadesByCategory: (state) => (categoryName: string) => {
      return state.promenades_from_db.filter((promenade) =>
        promenade.categories.some((category) => category.slug === categoryName)
      )
    },
    filterPromenadesBySearch: (state) => (search: string) => {
      return state.promenades_from_db.filter((promenade) =>
        promenade.title.toLowerCase().includes(search.toLowerCase())
      )
    },
  },
  actions: {
    setPromenadesFromdb(promenades: Promenade[]) {
      this.promenades_from_db = promenades.sort((a, b) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      })
    },
    addExtractid(id: number): boolean {
      if (this.isExcerptAdded.includes(id)) {
        return true
      } else {
        this.isExcerptAdded.push(id)
        return false
      }
    },
    publishPromenade(promenadeId: number) {
      const promenade = this.promenades_from_db.find(
        (p) => p.id === promenadeId
      )

      if (!promenade) {
        throw new Error('Promenade non trouvée')
      } else {
        promenade!.published = !promenade!.published
      }
    },

    removeExtractid(id: number): void {
      const index = this.isExcerptAdded.indexOf(id)
      if (index !== -1) {
        this.isExcerptAdded.splice(index, 1)
      }
    },
    removeAllExtract() {
      this.isExcerptAdded = []
    },
    setPromenade(currentPromenade: Promenade | null) {
      // if (currentPromenade && currentPromenade.content) {
      //   currentPromenade.content.forEach((item, index) => {
      //     item.index = index
      //   })
      // }
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
    setCreationSourceImageContent(id: number, value: string) {
      this.items[id].source = value
    },
    setSourceImageContentEdit(key: string, value: string) {
      const itemIndex = this.itemsEdit.findIndex((item) => item.key === key)
      if (itemIndex !== -1) {
        this.itemsEdit[itemIndex].source = value
      }
    },
  },
})
