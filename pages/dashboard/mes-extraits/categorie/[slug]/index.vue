<script lang="ts" setup>
import { useCategoryStore } from '~~/store/category'
import { BtnAdminPage } from '~~/types/AdminTitlePage'

definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})
const route = useRoute()
const categoriesStore = useCategoryStore()
const categories = categoriesStore.categories

const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'link',
    titleBlack: 'Mes',
    titlePurple: 'Extraits',
    actionBtn: [{ action: 'Créer un extrait' }],
    route: { name: `dashboard/creer-un-extrait` },
    category: categories.find(
      (category) => category.slug === route.params.slug
    ),
  },
])
</script>

<template>
  <AdminMenu />
  <AdminTitle
    v-if="datasTitle[0].type === 'link'"
    :title-black="datasTitle[0].titleBlack"
    :title-purple="datasTitle[0].titlePurple"
    :action-btn="datasTitle[0].actionBtn"
    :route="datasTitle[0].route.name"
    :category="datasTitle[0].category"
  />
  <div>coucou</div>
</template>
