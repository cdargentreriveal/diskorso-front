<script setup lang="ts">
import { Category } from './types/Categories'
import { useCategoryStore } from '~~/store/category'
import { useExtractStore } from '~~/store/extracts'
import { usePromenadeStore } from '~~/store/promenade'
import { useUserStore } from '~~/store/user'

const config = useRuntimeConfig()
const categoriesStore = useCategoryStore()
const userStore = useUserStore()
const extractsStore = useExtractStore()
const promenadesStore = usePromenadeStore()

const { data: categories } = await useAsyncData<Category[]>('categories', () =>
  $fetch(`${config.public.baseURL}/category/all`)
)

onMounted(() => {
  categoriesStore.setCategories(categories)
  const userData = sessionStorage.getItem('user_data')
  const extractsData = sessionStorage.getItem('extracts')
  const promenadesData = sessionStorage.getItem('promenades')
  if (userData) {
    userStore.setUser(JSON.parse(userData))
  }
  if (extractsData) {
    extractsStore.setExtractsFromdb(JSON.parse(extractsData))
  }
  if (promenadesData) {
    promenadesStore.setPromenadesFromdb(JSON.parse(promenadesData))
  }
})
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
