<script lang="ts" setup>
import { BtnAdminPage } from '@/types/AdminTitlePage'
import { ExtractFetched } from '~~/types/Extracts'
import { refreshToken } from '~~/utils/connected/refreshToken'
definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})
const config = useRuntimeConfig()
let xsrfToken: any = null
if (process.client) {
  xsrfToken = localStorage.getItem('xsrfToken')
}
interface ExtractWithModal extends ExtractFetched {
  showModal: boolean
}

type Response = {
  data: ExtractWithModal[]
  message: string
  success: boolean
}

const {
  data: response,
  error,
  execute,
} = await useAsyncData<Response>(
  'response',
  async () =>
    await $fetch(`${config.public.baseURL}/extract/user-connected/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${xsrfToken}`,
      },
      credentials: 'include',
    }).then((res: any) => {
      const extracts = res.data.map((extract: ExtractFetched) => ({
        ...extract,
        showModal: false,
      }))
      return { data: extracts, message: res.message, success: res.success }
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

const toggle = (extract: any): boolean => {
  extract.showModal = !extract.showModal
  return extract.showModal
}

const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'link',
    titleBlack: 'Mes',
    titlePurple: 'Extraits',
    actionBtn: [{ action: 'Créer un extrait' }],
    route: { name: 'creer-un-extrait' },
  },
])
onMounted(() => {
  const descriptionCard = document.querySelectorAll('.card-content-description')
  if (descriptionCard) {
    descriptionCard.forEach((element) => {
      const shortDescription = element.textContent?.substring(0, 170) ?? ''
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
    <AdminCatsFilter page="extraits" />
    <div class="container_promenade w-9/12 mx-auto flex items-center flex-wrap">
      <div
        v-for="(extract, index) in response?.data"
        :key="index"
        class="w-4/12 p-2 h-full"
      >
        <AdminCardTemplateExtrait
          :extract="extract"
          :show-modal="extract.showModal"
          :toggle="() => toggle(extract)"
          class="h-full"
        />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.action-button {
  background-color: var(--purple-color);
}
</style>
