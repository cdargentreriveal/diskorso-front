<script lang="ts" setup>
import { useUserStore } from '~~/store/user'
import { BtnAdminPage } from '@/types/AdminTitlePage'
import { Promenade } from '~~/types/Promenades'
const user = useUserStore()
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

type Response = {
  data: Promenade[]
  message: string
  success: boolean
}
const { data: response } = await useAsyncData<Response>('response', () =>
  $fetch(`${config.public.baseURL}/promenadeditor/getpromenades`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${xsrfToken}`,
    },
    credentials: 'include',
  })
)

const promenades = computed(() => {
  if (response.value === null) {
    return []
  } else {
    const promenadesCopy = [...response.value.data] // create a copy of the array
    promenadesCopy.sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return dateB.getTime() - dateA.getTime() // sort in descending order
    })
    return promenadesCopy
  }
})

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
    <div class="w-9/12 mx-auto flex flex-wrap mb-10 h-full">
      <AdminCatsFilter />
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
<style scoped lang="scss">
.action-button {
  background-color: var(--purple-color);
}
</style>
