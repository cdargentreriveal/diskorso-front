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
const numberOfPromenadeUserConnectedToDisplayBySearch = ref(9)

const filteredPromenades = ref<Promenade[]>([])

onMounted(() => {
  const slug = route.params.slug
  const search = Array.isArray(slug) ? slug[0] : slug
  filteredPromenades.value = promenadesStore.filterPromenadesBySearch(search)
})

const totalPromenades = computed(() => filteredPromenades.value.length || 0)

const totalPages = computed(() =>
  Math.ceil(
    totalPromenades.value /
      numberOfPromenadeUserConnectedToDisplayBySearch.value
  )
)

const paginationPageCurrent = ref(1)

const paginatedPromenades = computed(() => {
  const start =
    (paginationPageCurrent.value - 1) *
    numberOfPromenadeUserConnectedToDisplayBySearch.value
  const end = start + numberOfPromenadeUserConnectedToDisplayBySearch.value
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
    <!-- <AdminCatsFilter /> -->
    <div class="w-9/12 mx-auto mb-10 h-full">
      <div class="mb-8 text-sm">
        <nuxt-link
          to="/dashboard"
          class="bg-gray gray-color py-2 px-4 rounded-full"
        >
          <span class="red-color mr-2">✕</span>
          <span>effacer la recherche</span>
        </nuxt-link>
      </div>
      <div class="promenade-number">
        <span class="mr-2 text-lg font-bold purple-color">{{
          totalPromenades
        }}</span>
        <span>promenade(s) trouvée(s) pour</span
        ><span class="italic">"{{ route.params.slug }}"</span>
      </div>
    </div>
    <DisplayPromenadesSearchSectionConnected locate="mes-promenades" />
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
