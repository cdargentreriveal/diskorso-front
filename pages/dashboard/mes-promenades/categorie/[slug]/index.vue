<script lang="ts" setup>
import { useCategoryStore } from '~~/store/category'
import { BtnAdminPage } from '~~/types/AdminTitlePage'
import { usePromenadeStore } from '~~/store/promenade'
import { Promenade } from '~~/types/Promenades'

definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})

const route = useRoute()

const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'link',
    titleBlack: 'Mes',
    titlePurple: 'promenades',
    actionBtn: [{ action: 'Créer une promenade' }],
    route: { name: 'dashboard/creer-une-promenade' },
    category: categories.find(
      (category) => category.slug === route.params.slug
    ),
  },
])

const categoriesStore = useCategoryStore()
const categories = categoriesStore.categories
const promenadesStore = usePromenadeStore()
const numberOfPromenadeUserConnectedToDisplayByCategory = ref(9)

const filteredPromenades = ref<Promenade[]>([])

onMounted(() => {
  const slug = route.params.slug
  const category = Array.isArray(slug) ? slug[0] : slug
  filteredPromenades.value =
    promenadesStore.filterPromenadesByCategory(category)
})

const totalPromenades = computed(() => filteredPromenades.value.length || 0)

const totalPages = computed(() =>
  Math.ceil(
    totalPromenades.value /
      numberOfPromenadeUserConnectedToDisplayByCategory.value
  )
)

const paginationPageCurrent = ref(1)

const paginatedPromenades = computed(() => {
  const start =
    (paginationPageCurrent.value - 1) *
    numberOfPromenadeUserConnectedToDisplayByCategory.value
  const end = start + numberOfPromenadeUserConnectedToDisplayByCategory.value
  return filteredPromenades.value.slice(start, end)
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
    <AdminCatsFilter />
    <DisplayPromenadesSearchSectionConnected />

    <div class="w-9/12 mx-auto flex flex-wrap mb-10 h-full">
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
        v-if="totalPromenades !== null && totalPromenades !== null"
        :first="first"
        :last="last"
        :previous="previous"
        :next="next"
        :total-promenade="+totalPromenades"
        :totalpage="+totalPages"
      />
    </div>
  </div>
</template>
