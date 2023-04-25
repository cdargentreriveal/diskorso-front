<script lang="ts" setup>
import { BtnAdminPage } from '@/types/AdminTitlePage'
import { useUserStore } from '~~/store/user'
import { ExtractFetched } from '~~/types/Extracts'
import { refreshToken } from '~~/utils/connected/refreshToken'
import { useExtractStore } from '~~/store/extracts'
definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})
const config = useRuntimeConfig()
const user = useUserStore()
const extractsStore = useExtractStore()
let xsrfToken: any = null
if (process.client) {
  xsrfToken = localStorage.getItem('xsrfToken')
}

const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'link',
    titleBlack: totalExtracts.value.toString(),
    titlePurple: 'extrait(s) trouvé(s)',
    actionBtn: [{ action: 'Créer un extrait' }],
    route: { name: 'dashboard/creer-un-extrait' },
  },
])

interface ExtractWithModal extends ExtractFetched {
  showModal: boolean
}

type Response = {
  data: ExtractWithModal[]
  message: string
  success: boolean
}

const route = useRoute()

const {
  data: extractsBySlug,
  error,
  execute,
} = await useAsyncData<Response>(
  'extractsBySlug',
  async () =>
    await $fetch(
      `${config.public.baseURL}/extract/tag/search/${route.params.slug}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${xsrfToken}`,
        },
        credentials: 'include',
      }
    ).then((res: any) => {
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

const totalExtracts = computed(() => {
  if (extractsBySlug.value) {
    return extractsBySlug.value.data.length
  } else {
    return 0
  }
})

const toggle = (extract: any): boolean => {
  extract.showModal = !extract.showModal
  return extract.showModal
}

const deleteAllExtracts = () => {
  extractsStore.removeAllExtract()
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key!.startsWith('extract_') && key!.endsWith('_isChecked')) {
      localStorage.removeItem(key!)
    }
  }
}
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
    <DisplayPromenadesSearchSectionConnected />
    <div
      v-if="extractsStore.extracts.length > 0"
      class="container_promenade w-9/12 switch-btn mb-4 flex items-center text-xs mb-8 mx-auto"
    >
      <button
        class="bg-gray gray-color py-2 px-4 ml-2 rounded-full"
        @click="deleteAllExtracts()"
      >
        <span class="red-color mr-2">✕</span>
        <span>Tout déselectionner</span>
      </button>
    </div>
    <div
      class="container_promenade w-9/12 mx-auto flex items-center flex-wrap mb-8"
    >
      <div
        v-for="(extract, index) in extractsBySlug?.data"
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
.switch {
  position: relative;
  display: inline-block;
  width: 35px;
  height: 20px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
</style>
