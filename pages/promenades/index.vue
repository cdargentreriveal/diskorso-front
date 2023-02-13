<script lang="ts" setup>
import { Promenade } from '../../types/Promenades'
import { Category } from '~~/types/Categories'
import { usePromenadeStore } from '@/store/promenades'

definePageMeta({
  layout: 'page',
})

const numberOfPromenade = usePromenadeStore()
const query = ref('latest')

const { data: lastNumberData } = await useFetch<number>(
  'https://promenadesapi-production.up.railway.app/promenade/findLastPromenade'
)

onMounted(() => {
  query.value = `2/${lastNumberData.value}/0`
  refresh()
})

const url = computed(
  () =>
    `https://promenadesapi-production.up.railway.app/promenade/promenade-cursor/${query.value}`
)
const { data: promenades, refresh } = useAsyncData<Promenade[]>(
  'promenades',
  () => $fetch(url.value)
)

const lastId = computed(() => {
  if (promenades.value === null) {
    return null
  }
  return promenades.value[1].id
})

const firstId = computed(() => {
  if (promenades.value === null) {
    return 0
  }
  return promenades.value[0].id
})

function next() {
  query.value = `${numberOfPromenade.count}/${lastId.value}/1`
  refresh()
}

function previous() {
  query.value = `${-numberOfPromenade.count}/${firstId.value}/1`
  refresh()
}

function first() {
  query.value = 'latest'
  refresh()
}

const { data: categories } = useFetch<Category[]>(
  'https://promenadesapi-production.up.railway.app/category/all'
)
const searchTag = ref('')
const search = () => {
  return navigateTo(`/promenades/search/${searchTag.value}`)
}
</script>

<template>
  <div class="container mx-auto">
    <div class="btns-categories w-9/12 mx-auto">
      <div class="flex items-center justify-center">
        <div v-for="(categorie, index) in categories" :key="index">
          <NuxtLink :to="`/categorie/${categorie.slug}`"
            ><button
              :class="`category-btn px-8 py-4 mx-2 rounded-full text-sm ${categorie.color} uppercase`"
            >
              {{ categorie.title }}
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="search-bar-container">
      <div
        class="search-bar mt-10 mb-18 flex items-center w-1/2 -xl:w-9/12 -sm:w-full mx-auto h-[50px]"
      >
        <div class="search-bar-input w-full h-full">
          <input
            v-model="searchTag"
            type="search"
            placeholder="Recherche par mots clés"
            class="py-4 px-8 w-full h-full border-gray border text-sm italic"
            @keyup.enter="search"
          />
        </div>
        <div class="search-bar-button text-white text-sm h-full">
          <NuxtLink :to="`/promenades/search/${searchTag}`">
            <button class="px-8 w-full h-full uppercase">
              <span class="flex items-center">Rechercher</span>
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
    <Separator />
    <div class="">
      <TitleSection title-black="Toutes les" title-purple="Promenades" />
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
    <button class="p-8" @click="first">First Page</button>
    <button class="p-8" @click="previous">Previous</button>
    <button class="p-8" @click="next">Next</button>
    <div class="py-5">
      <Pagination />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.search-bar-input input {
  border-radius: 9999px 0 0 9999px;
  color: var(--gray-color);
  &:focus {
    outline: none;
  }
}
.search-bar-button button {
  background-color: var(--blue-color);
  border-radius: 0 9999px 9999px 0;
  border: none;
  & :before {
    content: '';
    height: 20px;
    width: 20px;
    background-image: url('@/assets/images/icons/Icon-search.svg');
    display: inline-block;
    margin-right: 0.5rem;
  }
}
.search-bar-button {
  a {
    display: inline-block;
    height: 100%;
    border-radius: 0 9999px 9999px 0;
  }
  & :hover {
    background-color: #4e8ca5;
  }
}
fieldset {
  border: none;
}
</style>
