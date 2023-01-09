import { defineStore } from 'pinia'
import { Category } from '~~/models/Category'

export type Categories = Category[] | undefined[]

interface CategoryState {
  categories: Categories
}
export const useCategoryStore = defineStore('categoryStore', {
  state: (): CategoryState => ({
    categories: [],
  }),
  actions: {
    async fetchCategories(): Promise<void> {
      this.categories = await fetch('http://localhost:4000/category/all').then(
        (response): Promise<Categories> => response.json()
      )
    },
  },
})
