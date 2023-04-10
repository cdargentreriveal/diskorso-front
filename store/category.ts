import { defineStore } from 'pinia'
import { Category } from '~~/types/Categories'

export type Categories = Category[]

interface CategoryState {
  categories: Categories
}
export const useCategoryStore = defineStore('categoryStore', {
  state: (): CategoryState => ({
    categories: [],
  }),
  actions: {
    setCategories(categories: any) {
      this.categories = categories
    },
  },
})
