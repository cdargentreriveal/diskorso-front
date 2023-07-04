<script setup lang="ts">
import { Category } from './types/Categories'
import { useCategoryStore } from '~~/store/category'
const config = useRuntimeConfig()

const categoriesStore = useCategoryStore()

const { data: categories } = await useAsyncData<Category[]>('categories', () =>
  $fetch(`${config.public.baseURL}/category/all`)
)

onMounted(() => {
  categoriesStore.setCategories(categories)
})

// if (process.client) {
//   window.addEventListener('beforeunload', () => {
//     localStorage.clear()
//   })
// }
// onUnmounted(() => {
//   // Remove the beforeunload event listener
//   window.removeEventListener('beforeunload', () => {
//     localStorage.clear()
//   })
// })
</script>

<template>
  <div>
    <div class="app relative z-10">
      <NuxtLayout>
        <main>
          <NuxtPage />
        </main>
      </NuxtLayout>
    </div>
    <div id="modals" class="relative z-20"></div>
  </div>
</template>
