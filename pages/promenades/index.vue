<script lang="ts" setup>
import { Promenade } from '../../types/Promenades'

definePageMeta({
  layout: 'page',
})

// ________________________________________________________________________________________
//* state
// ________________________________________________________________________________________
const numberOfPromenade = ref(6)
const query = ref(`promenade/findLastPromenades/${numberOfPromenade.value}`)
const config = useRuntimeConfig()

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
//   'promenade/findLastPromenade'
// )
const { data: lastNumberData } = await useAsyncData<number>(
  'lastNumberData',
  () => $fetch(`${config.public.baseURL}/promenade/findLastPromenade`)
)
// const { data: firstNumberData } = await useDiskorso<number>(
//   'promenade/findFirstPromenade'
// )
const { data: firstNumberData } = await useAsyncData<string>(
  'firstNumberData',
  () => $fetch(`${config.public.baseURL}/promenade/findFirstPromenade`)
)
const paginationPageCurrent = ref(1)
const Loading = ref(false)
// next
async function next() {
  Loading.value = true
  if (
    lastId.value === null ||
    promenades.value === null ||
    firstNumberData.value === null
  ) {
    query.value = `promenade/findLastPromenades/${numberOfPromenade.value}`
  } else if (lastId.value === +firstNumberData.value) {
    paginationPageCurrent.value = totalPages
    Loading.value = false
    return 'no more promenade'
  } else {
    query.value = `promenade/promenade-cursor/${numberOfPromenade.value}/${lastId.value}/1/desc`
    refresh()
  }
  await nextTick(() => {
    paginationPageCurrent.value = paginationPageCurrent.value + 1
    setTimeout(() => {
      Loading.value = false
    }, 250)
  })
}
// previous
async function previous() {
  Loading.value = true
  if (lastId.value === null || lastNumberData.value === null) {
    refresh()
    query.value = `promenade/findLastPromenades/${numberOfPromenade.value}`
  } else if (firstId.value === +lastNumberData.value) {
    paginationPageCurrent.value = 1
    Loading.value = false
    // refresh()
    // query.value = `findLastPromenades/${numberOfPromenade.value}`
    return 'no more promenade'
  } else {
    query.value = `promenade/promenade-cursor/${numberOfPromenade.value}/${firstId.value}/1/asc`
    refresh()
  }
  await nextTick(() => {
    paginationPageCurrent.value = paginationPageCurrent.value - 1
    setTimeout(() => {
      Loading.value = false
    }, 250)
  })
}
// return first
async function first() {
  query.value = `promenade/findLastPromenades/${numberOfPromenade.value}`
  refresh()
  await nextTick(() => {
    paginationPageCurrent.value = 1
    setTimeout(() => {
      Loading.value = false
    }, 250)
  })
}

// ________________________________________________________________________________________
//* Methods pour metadata : nombre total de promenades et de pages
// ________________________________________________________________________________________
// const { data: totalPromenades } = await useDiskorso<number>(
//   'promenade/countAll'
// )
const { data: totalPromenades } = await useAsyncData<number>(
  'totalPromenades',
  () => $fetch(`${config.public.baseURL}/promenade/countAll`)
)
let totalPages = 0
if (totalPromenades.value === null) {
  totalPages = 0
} else {
  totalPages = Math.ceil(+totalPromenades.value / numberOfPromenade.value)
}
</script>

<template>
  <div
    v-if="Loading"
    class="loading fixed bg-slate-600/[0.9] h-full w-full left-0 top-0 z-15 flex items-center justify-center"
  >
    <div>
      <div class="loader"></div>
      <div class="text-white mt-5 text-lg">Chargement des promenades</div>
    </div>
  </div>
  <div class="container mx-auto">
    <DisplayPromenadesCategorieSection />
    <DisplayPromenadesSearchSection />
    <Separator />
    <div class="">
      <TitleSection title-black="Toutes les" title-purple="Promenades" />
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
        :pagination-page-current="paginationPageCurrent"
      />
    </div>
  </div>
</template>
