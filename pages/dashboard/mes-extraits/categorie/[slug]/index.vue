<script lang="ts" setup>
import { BtnAdminPage } from '@/types/AdminTitlePage'
import { ExtractFetched } from '~~/types/Extracts'
import { useCategoryStore } from '~~/store/category'
import { useExtractStore } from '~~/store/extracts'
definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})

const route = useRoute()

const categoriesStore = useCategoryStore()
const categories = categoriesStore.categories

const extractsStore = useExtractStore()

const numberOfExtractToDisplay = ref(9)

interface ExtractWithModal extends ExtractFetched {
  showModal: boolean
}

const filteredExtracts = ref<ExtractWithModal[]>([])

onMounted(() => {
  const slug = route.params.slug
  const category = Array.isArray(slug) ? slug[0] : slug
  filteredExtracts.value = extractsStore
    .filterExtractsByCategory(category)
    .map((extract) => ({
      ...extract,
      showModal: false,
    }))
})

const totalExtracts = computed(() => filteredExtracts.value.length || 0)

const totalPages = computed(() =>
  Math.ceil(totalExtracts.value / numberOfExtractToDisplay.value)
)

const paginationPageCurrent = ref(1)

const paginatedExtracts = computed(() => {
  const start =
    (paginationPageCurrent.value - 1) * numberOfExtractToDisplay.value
  const end = start + numberOfExtractToDisplay.value
  return filteredExtracts.value.slice(start, end)
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

const deleteAllExtracts = () => {
  extractsStore.removeAllExtract()
  if (process.client) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key!.startsWith('extract_') && key!.endsWith('_isChecked')) {
        localStorage.removeItem(key!)
      }
    }
  }
}

const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'link',
    titleBlack: 'Mes',
    titlePurple: 'Extraits',
    actionBtn: [{ action: 'Créer un extrait' }],
    route: { name: 'dashboard/creer-un-extrait' },
    category: categories.find(
      (category) => category.slug === route.params.slug
    ),
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
      :category="datasTitle[0].category"
    />
    <AdminCatsFilter page="extraits" />
    <DisplayPromenadesSearchSectionConnected locate="mes-extraits" />

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
        v-for="(extract, index) in paginatedExtracts"
        :key="index"
        class="w-4/12 p-2 h-full"
      >
        <AdminCardTemplateExtrait :extract="extract" class="h-full" />
      </div>
    </div>
    <div class="py-5 w-9/12 mx-auto flex flex-wrap mb-10">
      <DisplayPromenadesPagination
        v-if="totalExtracts !== null"
        :first="first"
        :last="last"
        :previous="previous"
        :next="next"
        :total-promenade="+totalExtracts"
        :totalpage="+totalPages"
      />
    </div>
  </div>
</template>
