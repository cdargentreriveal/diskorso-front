<script lang="ts" setup>
import { Promenade } from '../types/Promenades'

definePageMeta({
  layout: 'page',
})

const { data: promenades } = await useFetch<Promenade[]>(
  'https://promenadesapi-production.up.railway.app/promenade/findLastPromenades/3'
)

onMounted(() => {
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
</script>

<template>
  <HomeHeroHeader />
  <HomeAboutDiskorso class="-md:px-5" />
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
      <div
        v-for="(promenade, index) in promenades"
        :key="index"
        class="card rounded bg-white box-shaddow w-[32%] -md:w-full"
      >
        <CardsTemplateCard :promenade="promenade" />
      </div>
    </div>
    <div class="text-center">
      <Button text="Voir les promenades" type="secondary" to="/promenades" />
    </div>
  </section>

  <CtaLogin class="-md:px-5" />
</template>
