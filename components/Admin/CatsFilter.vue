<script lang="ts" setup>
import { useCategoryStore } from '~~/store/category'
const propsAdminCat = defineProps({
  page: {
    type: String,
    default: '',
  },
})

const categoriesStore = useCategoryStore()
const categories = categoriesStore.categories
</script>

<template>
  <div class="btns-categories w-9/12 mx-auto mb-8">
    <div class="flex items-center justify-center">
      <div v-for="(categorie, index) in categories" :key="index">
        <div v-if="propsAdminCat.page === 'extraits'">
          <NuxtLink
            :to="`/dashboard/mes-extraits/categorie/${categorie?.slug}`"
          >
            <button
              :class="`category-btn px-8 py-4 mx-2 rounded-full text-sm ${categorie?.color} uppercase`"
            >
              {{ categorie?.title }}
            </button>
          </NuxtLink>
        </div>
        <div v-else>
          <NuxtLink
            :to="`/dashboard/mes-promenades/categorie/${categorie?.slug}`"
          >
            <button
              :class="`category-btn px-8 py-4 mx-2 rounded-full text-sm ${categorie?.color} uppercase`"
            >
              {{ categorie?.title }}
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
