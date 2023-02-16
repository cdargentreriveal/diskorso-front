<script lang="ts" setup>
import { Category } from '../../../types/Categories/'
import { Promenade } from '~~/types/Promenades'

definePageMeta({
  layout: 'page',
})

//* state
const route = useRoute()
const params = route.params.slug_id as String
const [slug, id] = params.split('_')
const numberOfPromenade = ref(1)
const query = ref(`user/findLastPromenades/${id}/${numberOfPromenade.value}`)

//* Requêtes pour pagination
const url = computed(
  () =>
    `https://promenadesapi-production.up.railway.app/promenade/${query.value}`
)
const { data: promenades, refresh } = useAsyncData<Promenade[]>(
  'promenades',
  async () => {
    const data = await $fetch<Promenade[]>(url.value)
    return data.sort((a, b) => b.id - a.id)
  }
)
//* Naviguation : previous - next - first
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
const { data: lastNumberData } = await useFetch<number>(
  `https://promenadesapi-production.up.railway.app/promenade/user/${id}/last-promenade`
)
const { data: firstNumberData } = await useFetch<number>(
  `https://promenadesapi-production.up.railway.app/promenade/category/${id}/first-promenade`
)
// next
function next() {
  if (
    lastId.value === null ||
    promenades.value === null ||
    firstNumberData.value === null
  ) {
    query.value = `user/findLastPromenades/${id}/${numberOfPromenade.value}`
  } else if (lastId.value === +firstNumberData.value) {
    return 'no more promenade'
  } else {
    query.value = `user/promenade-cursor/${id}/${numberOfPromenade.value}/${lastId.value}/1/desc`
    refresh()
  }
}
// previous
function previous() {
  if (lastId.value === null || lastNumberData.value === null) {
    refresh()
    query.value = `user/findLastPromenades/${id}/${numberOfPromenade.value}`
  } else if (firstId.value === +lastNumberData.value) {
    // refresh()
    // query.value = `findLastPromenades/${numberOfPromenade.value}`
    return 'no more promenade'
  } else {
    query.value = `user/promenade-cursor/${id}/${numberOfPromenade.value}/${firstId.value}/1/asc`
    refresh()
  }
}
// return first
function first() {
  query.value = `user/findLastPromenades/${id}/${numberOfPromenade.value}`
  refresh()
}

//* Détermine le nombre de page
const { data: totalPromenades } = await useFetch<number>(
  `https://promenadesapi-production.up.railway.app/promenade/user/${id}/count`
)
let totalPages = 0
if (totalPromenades.value === null) {
  totalPages = 0
} else {
  totalPages = Math.ceil(+totalPromenades.value / numberOfPromenade.value)
}
const { data: categories } = useFetch<Category[]>(
  'https://promenadesapi-production.up.railway.app/category/all'
)
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
            type="search"
            value=""
            placeholder="Recherche par mots clés"
            class="py-4 px-8 w-full h-full border-gray border text-sm italic"
          />
        </div>
        <div class="search-bar-button text-white text-sm h-full">
          <button class="px-8 w-full h-full uppercase">
            <span class="flex items-center">Rechercher</span>
          </button>
        </div>
      </div>
    </div>
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
      <Pagination
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
  & :hover {
    background-color: #4e8ca5;
  }
}
fieldset {
  border: none;
}
</style>
