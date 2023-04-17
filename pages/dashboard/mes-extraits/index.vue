<script lang="ts" setup>
import { BtnAdminPage } from '@/types/AdminTitlePage'
import { useUserStore } from '~~/store/user'
import { ExtractFetched } from '~~/types/Extracts'
import { firstNumberData, lastNumberData } from '~~/utils/connected'
import { refreshToken } from '~~/utils/connected/refreshToken'
definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})
const config = useRuntimeConfig()
const user = useUserStore()
let xsrfToken: any = null
if (process.client) {
  xsrfToken = localStorage.getItem('xsrfToken')
}
const numberOfExtractToDisplay = ref(2)
const lastNumberId = ref(0)
const firstNumberId = ref(0)
const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'link',
    titleBlack: 'Mes',
    titlePurple: 'Extraits',
    actionBtn: [{ action: 'Créer un extrait' }],
    route: { name: 'dashboard/creer-un-extrait' },
  },
])

const query = ref(`extract/getextracts/${numberOfExtractToDisplay.value}`)
interface ExtractWithModal extends ExtractFetched {
  showModal: boolean
}

type Response = {
  data: ExtractWithModal[]
  message: string
  success: boolean
}

// ________________________________________________________________________________________
//* Methods pour mettre à jour promenades en fonction de la navigation
// ________________________________________________________________________________________
const url = computed(() => `${config.public.baseURL}/${query.value}`)

const {
  data: response,
  error,
  execute,
} = await useAsyncData<Response>(
  'response',
  async () =>
    await $fetch(url.value, {
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

const totalExtracts = computed(() => user.currentUser?.totalExtracts || 0)
const totalPages = ref(
  Math.ceil(totalExtracts.value / numberOfExtractToDisplay.value)
)
watch(totalExtracts, (newValue) => {
  if (newValue === null) {
    totalPages.value = 0
  } else {
    totalPages.value = Math.ceil(+newValue / numberOfExtractToDisplay.value)
  }
})

const toggle = (extract: any): boolean => {
  extract.showModal = !extract.showModal
  return extract.showModal
}
// ________________________________________________________________________________________
//* Methods pour navigation : previous - next - first
// ________________________________________________________________________________________
const lastId = computed(() => {
  if (response.value === null) {
    return null
  }
  return response.value.data[response.value.data.length - 1].id
})
const firstId = computed(() => {
  if (response.value === null) {
    return 0
  } else {
    return response?.value.data[0].id
  }
})
const firstBtnPagination = ref(true)
const middleBtnPagination = ref(false)
const lastBtnPagination = ref(false)
onBeforeUpdate(() => {
  if (firstId.value === lastNumberId.value) {
    firstBtnPagination.value = true
    middleBtnPagination.value = false
    lastBtnPagination.value = false
  } else if (lastId.value === +firstNumberId.value) {
    firstBtnPagination.value = false
    middleBtnPagination.value = false
    lastBtnPagination.value = true
  } else {
    firstBtnPagination.value = false
    middleBtnPagination.value = true
    lastBtnPagination.value = false
  }
})
// next
async function next() {
  if (
    lastId.value === null ||
    response.value === null ||
    firstNumberId.value === null
  ) {
    query.value = `extract/extract-cursor/${numberOfExtractToDisplay.value}`
  } else if (lastId.value === +firstNumberId.value) {
    return 'no more promenade'
  } else {
    query.value = `extract/extract-cursor/${numberOfExtractToDisplay.value}/${lastId.value}/1/desc`
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
  if (lastId.value === null || lastNumberId.value === null) {
    execute()
    query.value = `extract/extract-cursor/${numberOfExtractToDisplay.value}`
  } else if (firstId.value === lastNumberId.value) {
    // refresh()
    // query.value = `findLastPromenades/${numberOfPromenade.value}`
    return 'no more promenade'
  } else {
    query.value = `extract/extract-cursor/${numberOfExtractToDisplay.value}/${firstId.value}/1/asc`
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
  query.value = `extract/extract-cursor/${numberOfExtractToDisplay.value}`
  const xsrfTokenTime = localStorage.getItem('xsrfToken_time')
  if (xsrfTokenTime !== null && Date.now() >= +xsrfTokenTime - 2000) {
    await refreshToken(config.public.baseURL)
    execute()
  } else {
    execute()
  }
}
onMounted(async () => {
  const descriptionCard = document.querySelectorAll('.card-content-description')
  if (descriptionCard) {
    descriptionCard.forEach((element) => {
      const shortDescription = element.textContent?.substring(0, 170) ?? ''
      element.textContent = shortDescription + '...'
    })
  }
  const resultLast = await lastNumberData(
    config.public.baseURL,
    'extract/findLastExtract'
  )
  lastNumberId.value = resultLast
  const resultFirst = await firstNumberData(
    config.public.baseURL,
    'extract/findFirstExtract'
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
    />
    <AdminCatsFilter page="extraits" />
    <div
      class="container_promenade w-9/12 mx-auto flex items-center flex-wrap mb-8"
    >
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
    <div class="py-5 w-9/12 mx-auto flex flex-wrap mb-10">
      <DisplayPromenadesPagination
        v-if="totalExtracts !== null"
        :first="first"
        :previous="previous"
        :next="next"
        :total-promenade="+totalExtracts"
        :totalpage="+totalPages"
        :first-btn-pagination="firstBtnPagination"
        :middle-btn-pagination="middleBtnPagination"
        :last-btn-pagination="lastBtnPagination"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.action-button {
  background-color: var(--purple-color);
}
</style>
