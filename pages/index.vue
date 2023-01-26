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
  <Separator />
  <div class="container mx-auto">
    <div class="flex my-20">
      <CardsTemplateCard
        class="w-1/3 gap-6"
        image=""
        alt="coucou toi"
        title="La planète Terre"
        date="01/03/2023"
        :categories="[
          {
            categoryName: 'Histoire',
            color: 'cat-purple ',
          },
          {
            categoryName: 'Science',
            color: 'cat-orange ',
          },
          {
            categoryName: 'Société',
            color: 'cat-blue ',
          },
        ]"
        text="La Terre est la troisième planète par ordre d'éloignement
        au Soleil et la cinquième plus grande du Système solaire
        aussi bien par la masse que par le diamètre"
        :author="[
          {
            authorName: 'Florian Bridoux',
            authorAvatar: 'cat-purple ',
          },
        ]"
      />
    </div>
  </div>
  <!--   <div>Page d'Accueil</div>
  <p>Les catégories</p>
  <div class="lg:flex items-center ml-auto space-x-20">
    <div v-for="(category, index) in categoriesList" :key="index">
      {{ category!.title }}
    </div>
  </div> -->
</template>
