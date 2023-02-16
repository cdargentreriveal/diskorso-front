<script lang="ts" setup>
import { Category } from '~~/types/Categories'
const { data: categories } = useFetch<Category[]>(
  'https://promenadesapi-production.up.railway.app/category/all'
)
</script>

<template>
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
</template>
