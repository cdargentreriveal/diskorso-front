<script lang="ts" setup>
import { BtnAdminPage } from '@/types/AdminTitlePage'
import { usePromenadeStore } from '~~/store/promenade'

definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})

const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'link',
    titleBlack: 'Mes',
    titlePurple: 'promenades',
    actionBtn: [{ action: 'Créer une promenade' }],
    route: { name: 'dashboard/creer-une-promenade' },
  },
])

const promenadesStore = usePromenadeStore()

const numberOfPromenadeUserConnectedToDisplay = ref(9)

const totalPromenades = computed(
  () => promenadesStore.promenades_from_db.length || 0
)

const totalPages = computed(() =>
  Math.ceil(
    totalPromenades.value / numberOfPromenadeUserConnectedToDisplay.value
  )
)

const paginationPageCurrent = ref(1)

const paginatedPromenades = computed(() => {
  const start =
    (paginationPageCurrent.value - 1) *
    numberOfPromenadeUserConnectedToDisplay.value
  const end = start + numberOfPromenadeUserConnectedToDisplay.value
  return promenadesStore.promenades_from_db.slice(start, end)
})

const next = () => {
  if (paginationPageCurrent.value < totalPages.value) {
    paginationPageCurrent.value++
  }
}

const previous = () => {
  if (paginationPageCurrent.value > 1) {
    paginationPageCurrent.value--
  }
}

const first = () => {
  paginationPageCurrent.value = 1
}

const last = () => {
  paginationPageCurrent.value = totalPages.value
}

const options = [
  { value: 'all', label: 'Tout' },
  { value: 'draft', label: 'Brouillon' },
  { value: 'published', label: 'Publiée' },
]

const selectedOption = ref('all')

// const refreshPromenades = async () => {
//   await promenadesStore.fetchPromenadesFromDb() // Assurez-vous que cette méthode rafraîchit les promenades à partir de la base de données
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
    <DisplayPromenadesSearchSectionConnected locate="mes-promenades" />
    <div class="w-9/12 mx-auto flex flex-wrap mb-10 h-full mt-20">
      <div
        v-for="(promenade, index) in paginatedPromenades"
        :key="index"
        class="w-4/12 p-2 h-full"
      >
        <AdminCardTemplate :promenade="promenade" class="h-full" />
      </div>
    </div>
    <div class="py-5 w-9/12 mx-auto flex flex-wrap mb-10">
      <AdminPagination
        v-if="totalPromenades !== null"
        :first="first"
        :last="last"
        :previous="previous"
        :next="next"
        :total-promenade="+totalPromenades"
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
</style>
