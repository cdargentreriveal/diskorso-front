<script lang="ts" setup>
import { useCategoryStore } from '~~/store/category'

const categoriesStore = useCategoryStore()
const categories = categoriesStore.categories
</script>

<template>
  <div class="btns-categories w-9/12 mx-auto mt-5 -md:w-full">
    <div class="flex items-center justify-center -md:flex-wrap">
      <div
        v-for="(categorie, index) in categories"
        :key="index"
        class="-md:my-3"
      >
        <NuxtLink :to="`/categorie/${categorie?.slug}`"
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
