<script lang="ts" setup>
import { BtnAdminPage } from '@/types/AdminTitlePage'
import { Promenade } from '~~/types/Promenades'
import { refreshToken } from '~~/utils/connected/refreshToken'
const config = useRuntimeConfig()

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

definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})

const {
  data: response,
  error,
  execute,
} = await useAsyncData<Promenade[]>(
  'response',
  async () =>
    await $fetch(`${config.public.baseURL}/promenadeditor/getpromenades`, {
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

onMounted(() => {
  const descriptionCard = document.querySelectorAll('.card-content-description')
  if (descriptionCard) {
    descriptionCard.forEach((element) => {
      const shortDescription = element.textContent?.substring(0, 90) ?? ''
      element.textContent = shortDescription + '...'
    })
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
    />
    <AdminCatsFilter />
    <div class="w-9/12 mx-auto flex flex-wrap mb-10 h-full">
      <div
        v-for="(promenade, index) in response"
        :key="index"
        class="w-4/12 p-2 h-full"
      >
        <AdminCardTemplate :promenade="promenade" class="h-full" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.action-button {
  background-color: var(--purple-color);
}
</style>
