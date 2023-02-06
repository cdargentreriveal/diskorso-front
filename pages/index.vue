<script lang="ts" setup>
import { Promenade } from '../types/Promenades'
definePageMeta({
  layout: 'page',
})
const { data: promenades } = useFetch<Promenade[]>(
  'https://promenadesapi-production.up.railway.app/promenade/all'
)
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
      <div v-for="(promenade, index) in promenades" :key="index">
        <CardsTemplateCard
          :image="promenade.main_image"
          :alt="promenade.title"
          :title="promenade.title"
          date="01/03/2023"
          :categories="promenade.categories"
          :text="promenade.summary"
          :author="promenade.user.username"
        />
      </div>
    </div>
    <div class="text-center">
      <Button text="Voir les promenades" type="secondary" to="/promenades" />
    </div>
  </section>
  <CtaLogin />
</template>
