<script lang="ts" setup>
import { useCategoryStore } from '~~/store/category'

const categoriesStore = useCategoryStore()
const categories = categoriesStore.categories
const Loading = ref(false)
function loader() {
  Loading.value = true
  setTimeout(() => {
    Loading.value = false
  }, 1000)
}
</script>

<template>
  <div
    v-if="Loading"
    class="loading fixed bg-slate-600/[0.9] h-full w-full left-0 top-0 z-15 flex items-center justify-center"
  >
    <div>
      <div class="loader"></div>
      <div class="text-white mt-5 text-lg">Chargement des promenades</div>
    </div>
  </div>
  <div class="btns-categories w-9/12 mx-auto mt-5 -md:w-full">
    <div class="flex items-center justify-center -md:flex-wrap">
      <div
        v-for="(categorie, index) in categories"
        :key="index"
        class="-md:my-3"
      >
        <NuxtLink :to="`/categorie/${categorie?.slug}`" @click.prevent="loader"
          ><button
            :class="`category-btn px-8 py-4 mx-2 rounded-full text-sm ${categorie?.color} uppercase`"
          >
            {{ categorie?.title }}
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
