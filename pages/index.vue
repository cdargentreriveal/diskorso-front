<script lang="ts" setup>
import { Promenade } from '../types/Promenades'

import { useCategoryStore } from '~~/store/category'

const categories = useCategoryStore()
const cat = categories.categories
const config = useRuntimeConfig()
definePageMeta({
  layout: 'page',
})

const numberOfPromenade = ref(3)

const { data: promenades } = await useAsyncData<Promenade[]>('promenades', () =>
  $fetch(
    `${config.public.baseURL}/promenade/findLastPromenades/${numberOfPromenade.value}`
  )
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
  <HomeHeroHeader class="-md:overflow-hidden" />
  <HomeAboutDiskorso class="-md:px-5" />
  <Separator />
  <section class="container mx-auto promenades">
    <div class="py-8 text-center -sm:py-5">
      <div class="title uppercase font-bold text-4xl -sm:text-2xl">
        <h2>
          Les dernières <br />
          <span class="font-medium purple-color">Promenades</span>
        </h2>
      </div>
    </div>
    <div class="flex my-20 flex-wrap -sm:my-8 md:my-10">
      <div
        v-for="(promenade, index) in promenades"
        :key="index"
        class="card bg-white xl:w-4/12 -md:w-full -md:mx-5 lg:w-[47%] p-4 -md:px-0"
      >
        <CardsTemplateCard
          :promenade="promenade"
          class="box-shaddow rounded-lg overflow-hidden"
        />
      </div>
    </div>
    <div class="text-center">
      <Button text="Voir les promenades" type="secondary" to="/promenades" />
    </div>
  </section>

  <div class="w-8/12 mx-auto -lg:w-11/12">
    <CtaLogin />
  </div>
</template>
