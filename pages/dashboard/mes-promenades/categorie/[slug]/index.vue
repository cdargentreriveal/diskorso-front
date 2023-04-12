<script lang="ts" setup>
import { BtnAdminPage } from '~~/types/AdminTitlePage'
import { Promenade } from '~~/types/Promenades'
import { refreshToken } from '~~/utils/connected'

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
  },
])
// ________________________________________________________________________________________
//* state
// ________________________________________________________________________________________
const numberOfPromenade = ref(2)
const config = useRuntimeConfig()
const route = useRoute()
const query = ref(
  `promenadeditor/getpromenades/category/findLastPromenades/${route.params.slug}/${numberOfPromenade.value}`
)

// ________________________________________________________________________________________
//* Methods pour mettre à jour promenades en fonction de la navigation
// ________________________________________________________________________________________
const url = computed(() => `${config.public.baseURL}/${query.value}`)
const {
  data: promenades,
  refresh,
  error,
} = useAsyncData<Promenade[]>('promenades', async () => {
  const data = await $fetch<any>(url.value, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${xsrfToken}`,
    },
    credentials: 'include',
  })
  const promenades = data.data.sort((a: any, b: any) => b.id - a.id)
  return promenades
})

// if (error.value !== null) {
//   refreshToken(config.public.baseURL)
//     .then(() => {
//       execute()
//     })
//     .catch((error) => {
//       // eslint-disable-next-line no-console
//       console.error('Erreur lors du rafraîchissement du token:', error)
//     })
// }
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
    />
    <AdminCatsFilter />
    <div class="w-9/12 mx-auto flex flex-wrap mb-10 h-full">
      <div
        v-for="(promenade, index) in promenades"
        :key="index"
        class="w-4/12 p-2 h-full"
      >
        <AdminCardTemplate :promenade="promenade" class="h-full" />
      </div>
    </div>
  </div>
</template>
