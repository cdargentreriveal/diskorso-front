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
    return response.value.data.map((promenade) => ({
      ...promenade,
    }))
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
    <div class="w-9/12 mx-auto flex items-center flex-wrap mb-10">
      <div
        v-for="(promenade, index) in promenades"
        :key="index"
        class="w-4/12 p-2"
      >
        <AdminCardTemplate :promenade="promenade" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.action-button {
  background-color: var(--purple-color);
}
</style>
