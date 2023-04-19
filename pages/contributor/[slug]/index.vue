<script lang="ts" setup>
import { Promenade } from '~~/types/Promenades'

definePageMeta({
  layout: 'page',
})

// ________________________________________________________________________________________
//* state
// ________________________________________________________________________________________
const route = useRoute()
const config = useRuntimeConfig()
const slug = route.params.slug as string
// const [slug, id] = params.split('_')
const numberOfPromenade = ref(2)
const query = ref(
  `promenade/user/findLastPromenades/${slug}/${numberOfPromenade.value}`
)

// ________________________________________________________________________________________
//* Methods pour mettre à jour promenades en fonction de la navigation
// ________________________________________________________________________________________
const url = computed(() => `${config.public.baseURL}/${query.value}`)
const { data: promenades, refresh } = useAsyncData<Promenade[]>(
  'promenades',
  async () => {
    const data = await $fetch<Promenade[]>(url.value)
    return data.sort((a, b) => b.id - a.id)
  }
)

// ________________________________________________________________________________________
//* Methods pour navigation : previous - next - first
// ________________________________________________________________________________________
const lastId = computed(() => {
  if (promenades.value === null) {
    return null
  }
  return promenades.value[promenades.value.length - 1].id
})
const firstId = computed(() => {
  if (promenades.value === null) {
    return 0
  } else {
    return promenades.value[0].id
  }
})
const { data: lastNumberData } = await useDiskorso<number>(
  `promenade/user/${slug}/last-promenade`
)
const { data: firstNumberData } = await useDiskorso<number>(
  `promenade/user/${slug}/first-promenade`
)
// next
function next() {
  if (
    lastId.value === null ||
    promenades.value === null ||
    firstNumberData.value === null
  ) {
    query.value = `user/findLastPromenades/${slug}/${numberOfPromenade.value}`
  } else if (lastId.value === +firstNumberData.value) {
    return 'no more promenade'
  } else {
    query.value = `promenade/user/promenade-cursor/${slug}/${numberOfPromenade.value}/${lastId.value}/1/desc`
    refresh()
  }
}
// previous
function previous() {
  if (lastId.value === null || lastNumberData.value === null) {
    refresh()
    query.value = `promenade/user/findLastPromenades/${slug}/${numberOfPromenade.value}`
  } else if (firstId.value === +lastNumberData.value) {
    // refresh()
    // query.value = `findLastPromenades/${numberOfPromenade.value}`
    return 'no more promenade'
  } else {
    query.value = `promenade/user/promenade-cursor/${slug}/${numberOfPromenade.value}/${firstId.value}/1/asc`
    refresh()
  }
}
// return first
function first() {
  query.value = `promenade/user/findLastPromenades/${slug}/${numberOfPromenade.value}`
  refresh()
}

// ________________________________________________________________________________________
//* Methods pour metadata : nombre total de promenades et de pages
// ________________________________________________________________________________________
const { data: totalPromenades } = await useDiskorso<number>(
  `promenade/user/${slug}/count`
)
let totalPages = 0
if (totalPromenades.value === null) {
  totalPages = 0
} else {
  totalPages = Math.ceil(+totalPromenades.value / numberOfPromenade.value)
}
</script>

<template>
  <div class="container mx-auto">
    <DisplayPromenadesCategorieSection />
    <DisplayPromenadesSearchSection />
    <Separator />
    <div class="">
      <TitleSection title-black="Les promenades de" :title-purple="slug" />
    </div>
    <div class="flex mt-10 mb-20 gap-6 flex-wrap">
      <div
        v-for="(promenade, index) in promenades"
        :key="index"
        class="card rounded bg-white box-shaddow w-[32%] -md:w-full"
      >
        <CardsTemplateCard :promenade="promenade" />
      </div>
    </div>
    <div class="py-5">
      <DisplayPromenadesPagination
        v-if="totalPromenades !== null"
        :first="first"
        :previous="previous"
        :next="next"
        :total-promenade="+totalPromenades"
        :totalpage="+totalPages"
      />
    </div>
  </div>
</template>
