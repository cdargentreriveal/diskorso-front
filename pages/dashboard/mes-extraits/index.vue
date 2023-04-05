<script lang="ts" setup>
import { BtnAdminPage } from '@/types/AdminTitlePage'
import { ExtractFetched } from '~~/types/Extracts'
definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})
const config = useRuntimeConfig()
let xsrfToken: any = null
if (process.client) {
  xsrfToken = localStorage.getItem('xsrfToken')
}

type Response = {
  data: ExtractFetched[]
  message: string
  success: boolean
}

const { data: response } = await useAsyncData<Response>('response', () =>
  $fetch(`${config.public.baseURL}/extract/user-connected/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${xsrfToken}`,
    },
    credentials: 'include',
  })
)

const extracts = computed(() => {
  if (response.value === null) {
    return []
  } else {
    return response.value.data.map((extract) => ({
      ...extract,
    }))
  }
})

const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'link',
    titleBlack: 'Mes',
    titlePurple: 'Extraits',
    actionBtn: [{ action: 'Créer un extrait' }],
    route: { name: 'creer-un-extrait' },
  },
])
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
    <div
      class="container_promenade w-9/12 mx-auto flex items-center gap-8 flex-wrap"
    >
      <AdminCatsFilter />
      <div
        v-for="(extract, index) in extracts"
        :key="index"
        class="w-4/12 p-2 h-full"
      >
        <AdminCardTemplateExtrait :extract="extract" class="h-full" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.action-button {
  background-color: var(--purple-color);
}
</style>
