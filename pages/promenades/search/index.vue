<script lang="ts" setup>
import { Promenade } from '@/types/Promenades'
import { Category } from '~~/types/Categories'
definePageMeta({
  layout: 'page',
})
const { data: promenades } = useFetch<Promenade[]>(
  'https://promenadesapi-production.up.railway.app/promenade/all'
)

const { data: categories } = useFetch<Category[]>(
  'https://promenadesapi-production.up.railway.app/category/all'
)

const filteredCategories = computed(() => {
  if (!promenades || !promenades.value || !categories || !categories.value) {
    return []
  }
  const categoryCounts: { [key: string]: number } = {}
  promenades.value.forEach((promenade) => {
    promenade.categories.forEach((category) => {
      if (!categoryCounts[category.title]) {
        categoryCounts[category.title] = 1
      } else {
        categoryCounts[category.title] += 1
      }
    })
  })
  const filteredCategories = categories.value.filter((category) => {
    return categoryCounts[category.title]
  })
  return filteredCategories.map((category) => ({
    ...category,
    count: categoryCounts[category.title],
    selected: false,
  }))
})
const selectedCategories = ref<string[]>([])
const loading = ref(false)

const filteredPromenades = computed(() => {
  if (!promenades || !promenades.value) {
    return []
  }

  if (!selectedCategories.value.length) {
    return promenades.value
  }

  return promenades.value.filter((promenade) => {
    return selectedCategories.value.some((selectedCategory) => {
      return promenade.categories.some((category) => {
        return category.title === selectedCategory
      })
    })
  })
})
/* const updateSelectedCategories = (category: string) => {
  if (selectedCategories.value.includes(category)) {
    selectedCategories.value = selectedCategories.value.filter(
      (selected) => selected !== category
    )
  } else {
    selectedCategories.value = [...selectedCategories.value, category]
  }
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
} */
</script>

<template>
  <div class="container mx-auto">
    <div class="btns-categories w-9/12 mx-auto">
      <div class="flex items-center justify-center">
        <div v-for="(categorie, index) in categories" :key="index">
          <NuxtLink :to="`/categorie/${categorie.slug}`"
            ><button
              :class="`category-btn px-8 py-4 mx-2 rounded-full text-sm ${categorie.color} uppercase`"
            >
              {{ categorie.title }}
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="search-bar-container">
      <div
        class="search-bar mt-10 mb-18 flex items-center w-1/2 -xl:w-9/12 -sm:w-full mx-auto h-[50px]"
      >
        <div class="search-bar-input w-full h-full">
          <input
            type="search"
            value=""
            placeholder="Recherche par mots clés"
            class="py-4 px-8 w-full h-full border-gray border text-sm italic"
          />
        </div>
        <div class="search-bar-button text-white text-sm h-full">
          <NuxtLink to="/promenades/search">
            <button class="px-8 w-full h-full uppercase">
              <span class="flex items-center">Rechercher</span>
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
    <Separator />
    <div class="flex mt-10 mb-20">
      <div class="w-1/3 relative">
        <div class="filter py-5 w-1/2 sticky top-[15%]">
          <div class="filter-categories">
            <div class="filter-title mb-5 font-semibold text-lg">
              <h3>Catégories</h3>
            </div>
            <div v-for="(categorie, index) in filteredCategories" :key="index">
              <div>
                <input
                  id="scales"
                  v-model="selectedCategories"
                  type="checkbox"
                  :value="categorie.title"
                  name="scales"
                  class="my-4 mx-2 text-sm"
                />
                <label for="scales"
                  >{{ categorie.title }}
                  <span class="text-sm">({{ categorie.count }})</span></label
                >
              </div>
            </div>
          </div>
          <Separator />
          <div class="filter-author">
            <div class="filter-title mb-5 font-semibold text-lg">
              <h3>
                Auteurs / Autrices<sup class="ml-2 font-medium purple-color"
                  >5</sup
                >
              </h3>
            </div>
            <div class="authors h-[200px] overflow-hidden">
              <div v-for="(promenade, index) in promenades" :key="index">
                <div>
                  <input
                    id="scales"
                    type="checkbox"
                    name="scales"
                    class="my-4 mx-2 text-sm"
                  />
                  <label for="scales"
                    >{{ promenade.user.username }}
                    <span class="text-sm">(3)</span></label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-2/3">
        <p class="py-5">
          <span class="text-xl font-bold purple-color">38</span> résultats pour
          la recherche <span class="text-lg italic">“effet de serre“</span>
        </p>
        <div v-if="loading" class="loading">Chargement</div>
        <div v-else class="flex flex-wrap gap-6 pt-4">
          <div
            v-for="(promenade, index) in filteredPromenades"
            :key="index"
            class="card rounded bg-white box-shaddow w-[48%] -md:w-full"
          >
            <CardsTemplateCard
              :image="promenade.main_image"
              :alt="promenade.title"
              :title="promenade.title"
              :date="getDate(promenade.createdAt)"
              :categories="promenade.categories"
              :text="promenade.summary"
              :author="promenade.user.username"
              :avatar="promenade.user.picture"
              :slug="promenade.slug"
              :iduser="promenade.userId"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="py-5">
      <Pagination />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.search-bar-input input {
  border-radius: 9999px 0 0 9999px;
  color: var(--gray-color);
  &:focus {
    outline: none;
  }
}
.search-bar-button button {
  background-color: var(--blue-color);
  border-radius: 0 9999px 9999px 0;
  border: none;
  & :before {
    content: '';
    height: 20px;
    width: 20px;
    background-image: url('@/assets/images/icons/Icon-search.svg');
    display: inline-block;
    margin-right: 0.5rem;
  }
}
.search-bar-button {
  & :hover {
    background-color: #4e8ca5;
  }
}
fieldset {
  border: none;
}
.authors {
  overflow-y: scroll;
}
input[type='checkbox'] {
  cursor: pointer;
}
</style>
