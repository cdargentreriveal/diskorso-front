<script lang="ts" setup>
import { useCategoryStore } from '~~/store/category'
definePageMeta({
  layout: 'page',
})

const categoryStore = useCategoryStore()

onBeforeMount(() => {
  categoryStore.fetchCategories()
  const navbar = document.querySelector('.navbar')
  if (navbar) {
    const navBarWhite = navbar.classList.add('navbar-white')
    return navBarWhite
  }
})
onUnmounted(() => {
  const navbar = document.querySelector('.navbar')
  if (navbar) {
    const navBarWhite = navbar.classList.remove('navbar-white')
    return navBarWhite
  }
})
const categoriesList = computed(() => {
  return categoryStore.categories
})
</script>

<template>
  <HomeHeroHeader />
  <HomeAboutDiskorso />
  <Separator />
  <section class="container mx-auto promenades">
    <div class="py-8 text-center">
      <div class="title uppercase font-bold text-4xl">
        <h2>
          Les dernières <br />
          <span class="font-medium purple-color">Promenades</span>
        </h2>
      </div>
    </div>
    <div class="flex my-20 gap-6 flex-wrap">
      <CardsTemplateCard
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
    <div class="text-center">
      <Button text="Voir les promenades" type="secondary" to="/promenades" />
    </div>
  </section>
  <CtaLogin />
  <!--   <div>Page d'Accueil</div>
  <p>Les catégories</p>
  <div class="lg:flex items-center ml-auto space-x-20">
    <div v-for="(category, index) in categoriesList" :key="index">
      {{ category!.title }}
    </div>
  </div> -->
</template>
