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
          <button class="px-8 w-full h-full uppercase">
            <span class="flex items-center">Rechercher</span>
          </button>
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
            <div v-for="(categorie, index) in categories" :key="index">
              <div>
                <input
                  id="scales"
                  type="checkbox"
                  name="scales"
                  class="my-4 mx-2 text-sm"
                />
                <label for="scales"
                  >{{ categorie.title }} <span class="text-sm">(5)</span></label
                >
              </div>
            </div>
          </div>
          <Separator />
          <div class="filter-author">
            <div class="filter-title mb-5 font-semibold text-lg">
              <h3>Auteurs / Autrices</h3>
            </div>
            <div v-for="(categorie, index) in categories" :key="index">
              <div>
                <input
                  id="scales"
                  type="checkbox"
                  name="scales"
                  class="my-4 mx-2 text-sm"
                />
                <label for="scales"
                  >{{ categorie.title }} <span class="text-sm">(5)</span></label
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-2/3">
        <p class="py-5">
          <span class="text-xl font-bold purple-color">38</span> résultats pour
          la recherche <span class="text-lg italic">“ effet de serre “</span>
        </p>
        <div class="flex flex-wrap gap-6 justify-center">
          <div
            v-for="(promenade, index) in promenades"
            :key="index"
            class="card rounded bg-white box-shaddow w-[48%] -md:w-full"
          >
            <CardsTemplateCard
              :image="promenade.main_image"
              :alt="promenade.title"
              :title="promenade.title"
              date="01/03/2023"
              :categories="promenade.categories"
              :text="promenade.summary"
              :author="promenade.user.username"
              :slug="promenade.slug"
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
</style>
