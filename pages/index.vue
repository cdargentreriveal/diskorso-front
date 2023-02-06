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
  <HomeAboutDiskorso class="-md:px-5" />
  <Separator />
  <section class="container mx-auto promenades -md:px-5">
    <TitleSection title-black="Les dernières" title-purple="Promenades" />
    <div class="flex mt-10 mb-20 gap-6 flex-wrap">
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
  <CtaLogin class="-md:px-5" />
  <!--   <div>Page d'Accueil</div>
  <p>Les catégories</p>
  <div class="lg:flex items-center ml-auto space-x-20">
    <div v-for="(category, index) in categoriesList" :key="index">
      {{ category!.title }}
    </div>
  </div> -->
</template>
