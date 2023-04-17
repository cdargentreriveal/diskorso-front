<script lang="ts" setup>
import { useCategoryStore } from '~~/store/category'
import { BtnAdminPage } from '~~/types/AdminTitlePage'
import { Promenade } from '~~/types/Promenades'
import {
  firstNumberData,
  lastNumberData,
  refreshToken,
} from '~~/utils/connected'

const categoriesStore = useCategoryStore()
const categories = categoriesStore.categories
const numberOfPromenadeUserConnectedToDisplayByCategory = ref(2)

definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})

let xsrfToken: any = null
if (process.client) {
  xsrfToken = localStorage.getItem('xsrfToken')
}

const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'link',
    titleBlack: 'Mes',
    titlePurple: 'promenades',
    actionBtn: [{ action: 'Créer une promenade' }],
    route: { name: 'dashboard/creer-une-promenade' },
    category: categories.find(
      (category) => category.slug === route.params.slug
    ),
  },
])
// ________________________________________________________________________________________
//* state
// ________________________________________________________________________________________
const numberOfPromenade = ref(2)
const config = useRuntimeConfig()
const route = useRoute()
const query = ref(
  `promenadeditor/getpromenades/category/findLastPromenades/${route.params.slug}/${numberOfPromenadeUserConnectedToDisplayByCategory.value}`
)
const lastNumberId = ref(0)
const firstNumberId = ref(0)

// ________________________________________________________________________________________
//* Methods pour mettre à jour promenades en fonction de la navigation
// ________________________________________________________________________________________
const url = computed(() => `${config.public.baseURL}/${query.value}`)
const {
  data: promenadeByCat,
  execute,
  error,
} = await useAsyncData<Promenade[]>(
  'promenadeByCat',
  async () =>
    await $fetch<any>(url.value, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${xsrfToken}`,
      },
      credentials: 'include',
    }).then((res: any) => {
      const promenades = res.data.sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateB.getTime() - dateA.getTime()
      })
      return promenades
    })
)

if (error.value !== null) {
  refreshToken(config.public.baseURL)
    .then(() => {
      execute()
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Erreur lors du rafraîchissement du token:', error)
    })
}

// ________________________________________________________________________________________
//* Methods pour navigation : previous - next - first
// ________________________________________________________________________________________
const lastIdCat = computed(() => {
  if (promenadeByCat.value === null) {
    return null
  }
  return promenadeByCat.value[promenadeByCat.value.length - 1].id
})
const firstId = computed(() => {
  if (promenadeByCat.value === null) {
    return 0
  } else {
    return promenadeByCat.value[0].id
  }
})
// next
async function next() {
  if (
    lastIdCat.value === null ||
    promenadeByCat.value === null ||
    firstNumberId.value === null
  ) {
    query.value = `promenadeditor/getpromenades/category/findLastPromenades/${route.params.slug}/${numberOfPromenade.value}`
  } else if (lastIdCat.value === +firstNumberId.value) {
    return 'no more promenade'
  } else {
    query.value = `promenadeditor/category/promenade-cursor/${route.params.slug}/${numberOfPromenadeUserConnectedToDisplayByCategory.value}/${lastIdCat.value}/1/desc`
    const xsrfTokenTime = localStorage.getItem('xsrfToken_time')
    if (xsrfTokenTime !== null && Date.now() >= +xsrfTokenTime - 2000) {
      await refreshToken(config.public.baseURL)
      execute()
    } else {
      execute()
    }
  }
}
// previous
async function previous() {
  if (lastIdCat.value === null || lastNumberId.value === null) {
    execute()
    query.value = `promenadeditor/getpromenades/category/findLastPromenades/${route.params.slug}/${numberOfPromenade.value}`
  } else if (firstId.value === lastNumberId.value) {
    // refresh()
    // query.value = `findLastPromenades/${numberOfPromenade.value}`
    return 'no more promenade'
  } else {
    query.value = `promenadeditor/category/promenade-cursor/${route.params.slug}/${numberOfPromenadeUserConnectedToDisplayByCategory.value}/${lastIdCat.value}/1/asc`
    const xsrfTokenTime = localStorage.getItem('xsrfToken_time')
    if (xsrfTokenTime !== null && Date.now() >= +xsrfTokenTime - 2000) {
      await refreshToken(config.public.baseURL)
      execute()
    } else {
      execute()
    }
  }
}
// return first
async function first() {
  query.value = `promenadeditor/getpromenades/category/findLastPromenades/${route.params.slug}/${numberOfPromenade.value}`
  const xsrfTokenTime = localStorage.getItem('xsrfToken_time')
  if (xsrfTokenTime !== null && Date.now() >= +xsrfTokenTime - 2000) {
    await refreshToken(config.public.baseURL)
    execute()
  } else {
    execute()
  }
}

// ________________________________________________________________________________________
//* Methods pour metadata : nombre total de promenades et de pages
// ________________________________________________________________________________________
const { data: totalPromenades } = await useAsyncData<number>(
  'totalPromenades',
  async () =>
    await $fetch<any>(
      `${config.public.baseURL}/promenadeditor/category/${route.params.slug}/count`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${xsrfToken}`,
        },
        credentials: 'include',
      }
    )
)
const totalPages = ref(
  Math.ceil(
    totalPromenades.value! /
      numberOfPromenadeUserConnectedToDisplayByCategory.value
  )
)
watch(totalPromenades, (newValue) => {
  if (newValue === null) {
    totalPages.value = 0
  } else {
    totalPages.value = Math.ceil(
      +newValue / numberOfPromenadeUserConnectedToDisplayByCategory.value
    )
  }
})

onMounted(async () => {
  const resultLast = await lastNumberData(
    config.public.baseURL,
    `promenadeditor/category/${route.params.slug}/findLastPromenade`
  )
  lastNumberId.value = resultLast
  const resultFirst = await firstNumberData(
    config.public.baseURL,
    `promenadeditor/category/${route.params.slug}/findFirstPromenade`
  )
  firstNumberId.value = resultFirst
})
</script>

<template>
  <AdminMenu />
  <div class="container mx-auto">
    <AdminTitle
      v-if="datasTitle[0].type === 'link'"
      :title-black="datasTitle[0].titleBlack"
      :title-purple="datasTitle[0].titlePurple"
      :action-btn="datasTitle[0].actionBtn"
      :route="datasTitle[0].route.name"
      :category="datasTitle[0].category"
    />
    <AdminCatsFilter />
    <DisplayPromenadesSearchSection :admin="true" />
    <div class="w-9/12 mx-auto flex flex-wrap mb-10 h-full">
      <div
        v-for="(promenade, index) in promenadeByCat"
        :key="index"
        class="w-4/12 p-2 h-full"
      >
        <AdminCardTemplate :promenade="promenade" class="h-full" />
      </div>
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
