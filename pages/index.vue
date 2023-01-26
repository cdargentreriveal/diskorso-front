<script lang="ts" setup>
import { useCategoryStore } from '~~/store/category'
definePageMeta({
  layout: 'page',
})

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.fetchCategories()
})

const categoriesList = computed(() => {
  return categoryStore.categories
})
</script>

<template>
  <HomeHeroHeader />
  <HomeAboutDiskorso />
  <div>Page d'Accueil</div>
  <p>Les catégories</p>
  <div class="lg:flex items-center ml-auto space-x-20">
    <div v-for="(category, index) in categoriesList" :key="index">
      {{ category!.title }}
    </div>
  </div>
</template>
