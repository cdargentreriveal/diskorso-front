<script lang="ts" setup>
import { BtnAdminPage } from '@/types/AdminTitlePage'
import { useUserStore } from '~~/store/user'
import { ExtractFetched } from '~~/types/Extracts'
import { firstNumberData, lastNumberData } from '~~/utils/connected'
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
const numberOfExtractToDisplay = ref(9)
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
      const extracts = res.data
        .map((extract: ExtractFetched) => ({
          ...extract,
          showModal: false,
        }))
        .sort((a: any, b: any) => b.id - a.id)
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
  if (
    !response.value ||
    !response.value.data ||
    response.value.data.length === 0
  ) {
    return null
  }
  return response.value.data[response.value.data.length - 1].id
})
const firstId = computed(() => {
  if (
    response.value === null ||
    !response.value.data ||
    response.value.data.length === 0
  ) {
    return 0
  } else {
    return response.value.data[0].id ?? 0
  }
})

const paginationPageCurrent = ref(1)
const Loading = ref(false)

// next
async function next() {
  Loading.value = true
  if (
    lastId.value === null ||
    response.value === null ||
    firstNumberId.value === null
  ) {
    query.value = `extract/extract-cursor/${numberOfExtractToDisplay.value}`
  } else if (lastId.value === +firstNumberId.value) {
    paginationPageCurrent.value = totalPages.value
    Loading.value = false
    return 'no more promenade'
  } else {
    query.value = `extract/extract-cursor/${numberOfExtractToDisplay.value}/${lastId.value}/0/desc`
    if (process.client) {
      const xsrfTokenTime = localStorage.getItem('xsrfToken_time')
      if (xsrfTokenTime !== null && Date.now() >= +xsrfTokenTime - 2000) {
        await refreshToken(config.public.baseURL)
        execute()
      } else {
        execute()
      }
      await nextTick(() => {
        paginationPageCurrent.value = paginationPageCurrent.value + 1
        setTimeout(() => {
          Loading.value = false
        }, 250)
      })
    }
  }
}
// previous
async function previous() {
  Loading.value = true
  if (lastId.value === null || lastNumberId.value === null) {
    execute()
    query.value = `extract/extract-cursor/${numberOfExtractToDisplay.value}`
  } else if (firstId.value === lastNumberId.value) {
    // refresh()
    // query.value = `findLastPromenades/${numberOfPromenade.value}`
    Loading.value = false
    paginationPageCurrent.value = 1
    return 'no more promenade'
  } else {
    query.value = `extract/extract-cursor/${numberOfExtractToDisplay.value}/${firstId.value}/0/asc`
    const xsrfTokenTime = localStorage.getItem('xsrfToken_time')
    if (xsrfTokenTime !== null && Date.now() >= +xsrfTokenTime - 2000) {
      await refreshToken(config.public.baseURL)
      execute()
    } else {
      execute()
    }
    await nextTick(() => {
      paginationPageCurrent.value = paginationPageCurrent.value - 1
      setTimeout(() => {
        Loading.value = false
      }, 250)
    })
  }
}
// return first
async function first() {
  Loading.value = true
  query.value = `extract/getextracts/${numberOfExtractToDisplay.value}`
  const xsrfTokenTime = localStorage.getItem('xsrfToken_time')
  if (xsrfTokenTime !== null && Date.now() >= +xsrfTokenTime - 2000) {
    await refreshToken(config.public.baseURL)
    execute()
  } else {
    execute()
  }
  await nextTick(() => {
    paginationPageCurrent.value = 1
    setTimeout(() => {
      Loading.value = false
    }, 250)
  })
}

onMounted(async () => {
  const resultLast = await lastNumberData(
    config.public.baseURL,
    'extract/findLastExtract'
  )
  if (resultLast.statusCode === 401) {
    await refreshToken(config.public.baseURL)
    const resultLast2 = await lastNumberData(
      config.public.baseURL,
      'extract/findLastExtract'
    )
    lastNumberId.value = resultLast2
    const userDataJSON = localStorage.getItem('user_data')
    if (userDataJSON) {
      // Convertissez la chaîne JSON en objet JavaScript
      const userData = JSON.parse(userDataJSON)
      // Maintenant, userData contient l'objet que vous avez stocké
      await user.setUser(userData)
    } else {
      // Si aucune donnée n'a été trouvée, vous pouvez gérer cela ici
      // eslint-disable-next-line no-console
      console.log('Aucune donnée trouvée dans le local storage.')
    }
  } else {
    lastNumberId.value = resultLast
  }

  const resultFirst = await firstNumberData(
    config.public.baseURL,
    'extract/findFirstExtract'
  )
  firstNumberId.value = resultFirst
})

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
  <div
    v-if="Loading"
    class="loading fixed bg-slate-600/[0.9] h-full w-full left-0 top-0 z-15 flex items-center justify-center"
  >
    <div>
      <div class="loader"></div>
      <div class="text-white mt-5 text-lg">Chargement des extraits</div>
    </div>
  </div>
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

    <DisplayPromenadesSearchSectionConnected locate="mes-extraits" />
    <div
      v-if="extractsStore.extracts.length > 0"
      class="container_promenade w-9/12 switch-btn mb-4 flex items-center text-xs mx-auto -mt-4"
    >
      <button
        class="bg-gray gray-color py-2 px-4 ml-2 rounded-full"
        @click="deleteAllExtracts()"
      >
        <span class="red-color mr-2">✕</span>
        <span>Tout déselectionner</span>
      </button>
    </div>
    <button
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto flex items-center flex-wrap mb-8 h-8 px-3 text-xs rounded"
      role="menuitem"
    >
      <span>Tout supprimer</span>
    </button>
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
        :pagination-page-current="paginationPageCurrent"
      />
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
