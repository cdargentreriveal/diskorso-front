<script lang="ts" setup>
import { Promenade } from '~~/types/Promenades'

definePageMeta({
  layout: 'page',
})

// ________________________________________________________________________________________
//* state
// ________________________________________________________________________________________
const numberOfPromenade = ref(3)
const config = useRuntimeConfig()
const route = useRoute()
const query = ref(
  `promenade/category/findLastPromenades/${route.params.slug}/${numberOfPromenade.value}`
)

const slug: string | any = route.params.slug

// ________________________________________________________________________________________
//* Methods pour mettre à jour promenades en fonction de la navigation
// ________________________________________________________________________________________
const url = computed(() => `${config.public.baseURL}/${query.value}`)
const { data: promenades, refresh } = useAsyncData<Promenade[]>(
  'promenades',
  async () => {
    const data = await $fetch<Promenade[]>(url.value, {})
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
  return promenades.value[promenades.value.length - 1].publishedAt
})
const firstId = computed(() => {
  if (promenades.value === null) {
    return 0
  } else {
    return promenades.value[0].publishedAt
  }
})
// const { data: lastNumberData } = await useDiskorso<number>(
//   `promenade/category/last-promenade/${route.params.slug}`
// )
const { data: lastNumberData } = await useAsyncData<string>(
  'lastNumberData',
  () =>
    $fetch(
      `${config.public.baseURL}/promenade/category/last-promenade/${route.params.slug}`
    )
)
// const { data: firstNumberData } = await useDiskorso<number>(
//   `promenade/category/first-promenade/${route.params.slug}`
// )
const { data: firstNumberData } = await useAsyncData<string>(
  'firstNumberData',
  () =>
    $fetch(
      `${config.public.baseURL}/promenade/category/first-promenade/${route.params.slug}`
    )
)
// next
function next() {
  if (
    lastId.value === null ||
    promenades.value === null ||
    firstNumberData.value === null
  ) {
    query.value = `promenade/category/findLastPromenades/${route.params.slug}/${numberOfPromenade.value}`
  } else if (lastId.value.toString() === firstNumberData.value) {
    return 'no more promenade'
  } else {
    query.value = `promenade/category/promenade-cursor/${route.params.slug}/${numberOfPromenade.value}/${lastId.value}/0/desc`
    refresh()
  }
}
// previous
function previous() {
  if (lastId.value === null || lastNumberData.value === null) {
    refresh()
    query.value = `promenade/category/findLastPromenades/${route.params.slug}/${numberOfPromenade.value}`
  } else if (firstId.value.toString() === lastNumberData.value) {
    // refresh()
    // query.value = `findLastPromenades/${numberOfPromenade.value}`
    return 'no more promenade'
  } else {
    query.value = `promenade/category/promenade-cursor/${route.params.slug}/${numberOfPromenade.value}/${firstId.value}/0/asc`
    refresh()
  }
}
// return first
function first() {
  query.value = `promenade/category/findLastPromenades/${route.params.slug}/${numberOfPromenade.value}`
  refresh()
}

// ________________________________________________________________________________________
//* Methods pour metadata : nombre total de promenades et de pages
// ________________________________________________________________________________________
// const { data: totalPromenades } = await useDiskorso<number>(
//   `promenade/category/${route.params.slug}/count`
// )
const { data: totalPromenades } = await useAsyncData<number>(
  'totalPromenades',
  () =>
    $fetch(
      `${config.public.baseURL}/promenade/category/${route.params.slug}/count`
    )
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
      <TitleSection title-black="Les promenades" :title-purple="slug" />
    </div>
    <div class="flex mt-10 mb-20 gap-6 flex-wrap">
      <div
        v-for="(promenade, index) in promenades"
        :key="index"
        class="card rounded bg-white box-shaddow w-[32%] -md:w-full -sm:mx-5"
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
