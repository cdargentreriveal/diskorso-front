<script lang="ts" setup>
import { useCategoryStore } from '~~/store/category'
import { BtnAdminPage } from '~~/types/AdminTitlePage'
import { Promenade } from '~~/types/Promenades'
import { refreshToken } from '~~/utils/connected'

const categoriesStore = useCategoryStore()
const categories = categoriesStore.categories

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
    titleBlack: nombrePromenades.value.toString(),
    titlePurple: 'promenade(s) trouvée(s)',
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

const config = useRuntimeConfig()
const route = useRoute()

// ________________________________________________________________________________________
//* Methods pour mettre à jour promenades en fonction de la navigation
// ________________________________________________________________________________________

const {
  data: promenadeByCat,
  execute,
  error,
} = await useAsyncData<Promenade[]>(
  'promenadeByCat',
  async () =>
    await $fetch<any>(
      `${config.public.baseURL}/promenadeditor/tag/search/${route.params.slug}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${xsrfToken}`,
        },
        credentials: 'include',
      }
    ).then((res: any) => {
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

const nombrePromenades = computed(() => {
  if (promenadeByCat.value) {
    return promenadeByCat.value.length
  } else {
    return 0
  }
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
    <!-- <AdminCatsFilter /> -->
    <button class="w-9/12 mx-auto flex flex-wrap mb-10 h-full">
      <nuxt-link to="/dashboard"> Retour toutes lespromenades </nuxt-link>
    </button>
    <DisplayPromenadesSearchSectionConnected />
    <div class="w-9/12 mx-auto flex flex-wrap mb-10 h-full">
      <div
        v-for="(promenade, index) in promenadeByCat"
        :key="index"
        class="w-4/12 p-2 h-full"
      >
        <AdminCardTemplate :promenade="promenade" class="h-full" />
      </div>
    </div>
  </div>
</template>
