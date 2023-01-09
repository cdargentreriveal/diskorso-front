<script lang="ts" setup>
import { useCategoryStore } from '~~/store/category'

definePageMeta({
  layout: 'page',
})

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.fetchCategories()
})
// await useAsyncData('categories', () => {
//   return categoryStore.fetchCategories()
// })
const categoriesList = computed(() => {
  return categoryStore.categories
})
</script>

<template>
  <div>Page d'Accueil</div>
  <div v-for="(category, index) in categoriesList" :key="index">
    {{ category?.title }}
  </div>
</template>
