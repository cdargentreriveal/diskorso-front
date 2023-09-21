<script lang="ts" setup>
import { Promenade } from '~~/types/Promenades'
import { useCategoryStore } from '~~/store/category'
definePageMeta({
  layout: 'page',
})

// ________________________________________________________________________________________
//* state
// ________________________________________________________________________________________
const route = useRoute()
const loading = ref(false)
const config = useRuntimeConfig()

// ________________________________________________________________________________________
//* Methods pour récupérer promenades et catégorie en fonction du slug
// ________________________________________________________________________________________
// const { data: promenades } = useDiskorso<Promenade[]>(
//   `promenade/tag/search/${route.params.slug}`
// )
const { data: promenades } = await useAsyncData<Promenade[]>('promenades', () =>
  $fetch(`${config.public.baseURL}/promenade/tag/search/${route.params.slug}`)
)

const categoriesStore = useCategoryStore()
const categories = computed(() => categoriesStore.categories)

// ________________________________________________________________________________________
//* Methods pour filtrer
// ________________________________________________________________________________________
const filteredCategories = computed(() => {
  if (!categories || !categories.value) {
    return []
  }
  if (!promenades || !promenades.value || !categories) {
    return []
  }
  const categoryCounts: { [key: string]: number } = {}
  promenades.value.forEach((promenade) => {
    if (
      selectedUsers.value.length &&
      !selectedUsers.value.includes(promenade.user.username)
    ) {
      return // Ignore les promenades d'utilisateurs non sélectionnés
    }
    promenade.categories.forEach((category) => {
      if (!categoryCounts[category.title]) {
        categoryCounts[category.title] = 1
      } else {
        categoryCounts[category.title] += 1
      }
    })
  })
  if (!categories || !categories.value) {
    return []
  }

  const filteredCategories = categories.value?.filter((category) => {
    return categoryCounts[category.title]
  })
  return filteredCategories.map((category) => ({
    ...category,
    count: categoryCounts[category.title],
  }))
})
const selectedCategories = ref<string[]>([])
const selectedUsers = ref<string[]>([])

const filteredPromenades = computed(() => {
  if (!promenades || !promenades.value) {
    return []
  }
  let filteredPromenades = promenades.value
  if (selectedCategories.value.length) {
    filteredPromenades = filteredPromenades.filter((promenade) => {
      return selectedCategories.value.some((selectedCategory) => {
        return promenade.categories.some((category) => {
          return category.title === selectedCategory
        })
      })
    })
  }
  if (selectedUsers.value.length) {
    filteredPromenades = filteredPromenades.filter((promenade) => {
      return selectedUsers.value.includes(promenade.user.username)
    })
  }
  return filteredPromenades
})

// ________________________________________________________________________________________
//* Methods pour metadata : nombre de promenades par auteur
// ________________________________________________________________________________________
const usernamesWithCounts = computed(() => {
  if (!filteredPromenades.value) {
    return []
  }
  const usernameCounts: { [key: string]: number } = {}
  filteredPromenades.value.forEach((promenade) => {
    const username = promenade.user.username
    if (!usernameCounts[username]) {
      usernameCounts[username] = 1
    } else {
      usernameCounts[username] += 1
    }
  })
  return Object.entries(usernameCounts).map(([username, count]) => ({
    username,
    count,
  }))
})
</script>

<template>
  <client-only>
    <div class="container mx-auto">
      <DisplayPromenadesCategorieSection />
      <DisplayPromenadesSearchSection />
      <Separator />
      <div class="flex mt-10 mb-20 -md:inline-block -md:mt-0 w-full">
        <div class="w-1/3 relative -md:w-full">
          <div
            class="filter py-5 w-1/2 sticky top-[15%] -md:flex -lg:w-full -2xl:px-4"
          >
            <div class="filter-categories -md:w-7/12">
              <div class="filter-title mb-5 font-semibold text-lg">
                <h3>Catégories</h3>
              </div>
              <div
                v-for="(categorie, index) in filteredCategories"
                :key="index"
              >
                <div>
                  <input
                    :id="'checkboxCat' + index"
                    v-model="selectedCategories"
                    type="checkbox"
                    :value="categorie.title"
                    name="scales"
                    class="my-4 mx-2 text-sm"
                  />
                  <label :for="'checkboxCat' + index"
                    >{{ categorie.title }}
                    <span class="text-sm">({{ categorie.count }})</span></label
                  >
                </div>
              </div>
            </div>
            <Separator class="-md:hidden" />
            <div class="filter-author -md:w-5/12">
              <div class="filter-title mb-5 font-semibold text-lg">
                <h3>
                  Auteurs / Autrices<sup
                    class="ml-2 font-medium purple-color"
                    >{{ usernamesWithCounts.length }}</sup
                  >
                </h3>
              </div>
              <div
                :class="
                  usernamesWithCounts.length > 5
                    ? 'authors h-[200px] overflow-hidden'
                    : ''
                "
              >
                <div v-for="(user, index) in usernamesWithCounts" :key="index">
                  <div>
                    <input
                      :id="'checkboxAuth' + index"
                      v-model="selectedUsers"
                      type="checkbox"
                      name="scales"
                      :value="user.username"
                      class="my-4 mx-2 text-sm"
                    />
                    <label :for="'checkboxAuth' + index"
                      >{{ user.username }}
                      <span class="text-sm">({{ user.count }})</span></label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="promenades" class="w-2/3 -md:w-full -2xl:px-4">
          <p class="py-5">
            <span class="text-xl font-bold purple-color">{{
              filteredPromenades.length
            }}</span>
            <span v-if="filteredPromenades.length <= 1"> résultat </span>
            <span v-else> résultats </span>pour la recherche
            <span class="text-lg italic">“{{ route.params.slug }}“</span>
          </p>
          <div class="flex my-20 flex-wrap -sm:my-8 md:my-10">
            <div
              v-for="(promenade, index) in filteredPromenades"
              :key="index"
              class="card bg-white -lg:w-full p-4 xl:w-1/2"
            >
              <CardsTemplateCard
                :promenade="promenade"
                class="box-shaddow rounded-lg overflow-hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>
<style lang="scss" scoped>
.authors {
  overflow-y: scroll;
}
input[type='checkbox'] {
  cursor: pointer;
}
</style>
