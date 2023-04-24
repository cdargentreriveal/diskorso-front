<script lang="ts" setup>
import { BtnAdminPage } from '@/types/AdminTitlePage'
import { useUserStore } from '~~/store/user'
import { Promenade } from '~~/types/Promenades'
import { firstNumberData, lastNumberData } from '~~/utils/connected'
import { refreshToken } from '~~/utils/connected/refreshToken'
const config = useRuntimeConfig()
const user = useUserStore()

definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})

// ________________________________________________________________________________________
//* state
// ________________________________________________________________________________________
let xsrfToken: any = null
let xsrfTokenTime: any = null
if (process.client) {
  xsrfToken = localStorage.getItem('xsrfToken')
  xsrfTokenTime = localStorage.getItem('xsrfToken_time')
}
const lastNumberId = ref(0)
const firstNumberId = ref(0)
// if (xsrfToken && xsrfTokenTime && Date.now() >= +xsrfTokenTime - 2000) {
//   await refreshToken(config.public.baseURL)
// }
const numberOfPromenadeUserConnectedToDisplay = ref(3)
const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'link',
    titleBlack: 'Mes',
    titlePurple: 'promenades',
    actionBtn: [{ action: 'Créer une promenade' }],
    route: { name: 'dashboard/creer-une-promenade' },
  },
])
const query = ref(
  `promenadeditor/getpromenades/${numberOfPromenadeUserConnectedToDisplay.value}`
)

// ________________________________________________________________________________________
//* Methods pour mettre à jour promenades en fonction de la navigation
// ________________________________________________________________________________________
const url = computed(() => `${config.public.baseURL}/${query.value}`)

const {
  data: response,
  error,
  execute,
  refresh,
} = await useAsyncData<Promenade[]>(
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
      const promenades = res.data.sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateB.getTime() - dateA.getTime()
      })
      return promenades
    })
)
if (error.value) {
  refreshToken(config.public.baseURL)
    .then(() => {
      execute()
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Erreur lors du rafraîchissement du token:', error)
    })
}

// ________________________________________________________________________________________
//* Methods pour navigation : previous - next - first
// ________________________________________________________________________________________
const lastId = computed(() => {
  if (response.value === null) {
    return null
  }

  return response.value[response.value.length - 1]?.id ?? 0
})
const firstId = computed(() => {
  if (response.value === null) {
    return 0
  } else {
    return response.value[0]?.id ?? 0
  }
})

const firstBtnPagination = ref(true)
const middleBtnPagination = ref(false)
const lastBtnPagination = ref(false)

onBeforeUpdate(() => {
  subStringSummary()
  nextTick(() => {
    if (firstId.value && firstId.value === lastNumberId.value) {
      firstBtnPagination.value = true
      middleBtnPagination.value = false
      lastBtnPagination.value = false
    } else if (lastId.value && lastId.value === +firstNumberId.value) {
      firstBtnPagination.value = false
      middleBtnPagination.value = false
      lastBtnPagination.value = true
    } else {
      firstBtnPagination.value = false
      middleBtnPagination.value = true
      lastBtnPagination.value = false
    }
  })
})
// next

async function next() {
  if (
    lastId.value === null ||
    response.value === null ||
    firstNumberId.value === null
  ) {
    query.value = `promenadeditor/getpromenades/${numberOfPromenadeUserConnectedToDisplay.value}`
  } else if (lastId.value === +firstNumberId.value) {
    return 'no more promenade'
  } else {
    query.value = `promenadeditor/promenade-cursor/${numberOfPromenadeUserConnectedToDisplay.value}/${lastId.value}/1/desc`
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
    query.value = `promenadeditor/getpromenades/${numberOfPromenadeUserConnectedToDisplay.value}`
  } else if (firstId.value === lastNumberId.value) {
    // refresh()
    // query.value = `findLastPromenades/${numberOfPromenade.value}`
    return 'no more promenade'
  } else {
    query.value = `promenadeditor/promenade-cursor/${numberOfPromenadeUserConnectedToDisplay.value}/${firstId.value}/1/asc`
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
  query.value = `promenadeditor/getpromenades/${numberOfPromenadeUserConnectedToDisplay.value}`
  const xsrfTokenTime = localStorage.getItem('xsrfToken_time')
  if (xsrfTokenTime !== null && Date.now() >= +xsrfTokenTime - 2000) {
    await refreshToken(config.public.baseURL)
    execute()
  } else {
    execute()
  }
}

// ________________________________________________________________________________________
//* Methods pour metadata : nombre total de promenades et de pages
// ________________________________________________________________________________________
const totalPromenades = computed(
  () =>
    (user.currentUser?.publishedPromenadesCount ?? 0) +
    (user.currentUser?.unpublishedPromenadesCount ?? 0)
)
const totalPages = ref(
  Math.ceil(
    totalPromenades.value / numberOfPromenadeUserConnectedToDisplay.value
  )
)

function subStringSummary() {
  const descriptionCard = document.querySelectorAll('.card-content-description')
  if (descriptionCard) {
    descriptionCard.forEach((element) => {
      const shortDescription = element.textContent?.substring(0, 90)
      element.textContent = shortDescription + '...'
    })
  }
}
watch(totalPromenades, (newValue) => {
  if (newValue === null) {
    totalPages.value = 0
  } else {
    totalPages.value = Math.ceil(
      +newValue / numberOfPromenadeUserConnectedToDisplay.value
    )
  }
})

onMounted(async () => {
  subStringSummary()
  const resultLast = await lastNumberData(
    config.public.baseURL,
    'promenadeditor/findLastPromenade'
  )
  lastNumberId.value = resultLast
  const resultFirst = await firstNumberData(
    config.public.baseURL,
    'promenadeditor/findFirstPromenade'
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
    <AdminCatsFilter />
    <DisplayPromenadesSearchSectionConnected locate="mes-promenades" />
    <div class="w-9/12 mx-auto flex flex-wrap mb-10 h-full">
      <div
        v-for="(promenade, index) in response"
        :key="index"
        class="w-4/12 p-2 h-full"
      >
        <AdminCardTemplate :promenade="promenade" class="h-full" />
      </div>
    </div>
    <div class="py-5 w-9/12 mx-auto flex flex-wrap mb-10">
      <DisplayPromenadesPagination
        v-if="totalPromenades !== null"
        :first="first"
        :previous="previous"
        :next="next"
        :total-promenade="+totalPromenades"
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
