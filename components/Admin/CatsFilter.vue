<script lang="ts" setup>
import { useCategoryStore } from '~~/store/category'
const propsAdminCat = defineProps({
  page: {
    type: String,
    default: '',
  },
})
const route = useRoute()
const categoriesStore = useCategoryStore()
const categories = categoriesStore.categories
</script>

<template>
  <div class="btns-categories w-9/12 mx-auto mb-8">
    <div class="flex items-center relative">
      <div class="absolute -left-8">
        <NuxtLink
          v-if="route.path.startsWith('/dashboard/mes-promenades/categorie')"
          :to="`/dashboard/`"
        >
          <button
            class="category-btn px-7 py-4 mx-2 rounded-full text-xs font-semibold text-slate-400 uppercase flex items-center gap-3"
          >
            <img
              src="@/assets/images/icons/menu-admin/eye.svg"
              alt="icone oeil"
            />
            <span>Tout voir</span>
          </button>
        </NuxtLink>
        <NuxtLink
          v-if="route.path.startsWith('/dashboard/mes-extraits/categorie')"
          to="/dashboard/mes-extraits/"
        >
          <button
            class="category-btn px-7 py-4 mx-2 rounded-full text-xs font-semibold text-slate-400 uppercase flex items-center gap-3"
          >
            <img
              src="@/assets/images/icons/menu-admin/eye.svg"
              alt="icone oeil"
            />
            <span>Tout voir</span>
          </button>
        </NuxtLink>
      </div>
      <div class="flex items-center w-full justify-center">
        <div v-for="(categorie, index) in categories" :key="index">
          <div v-if="propsAdminCat.page === 'extraits'">
            <NuxtLink
              :to="`/dashboard/mes-extraits/categorie/${categorie?.slug}`"
            >
              <button
                v-if="route.name === 'dashboard-mes-extraits'"
                :class="`category-btn px-8 py-4 mx-2 rounded-full xl:text-xs 2xl:text-sm ${categorie?.color} uppercase`"
              >
                {{ categorie?.title }}
              </button>
              <button
                v-else
                :class="{
                  'category-btn': true,
                  'px-8 py-4 mx-2 rounded-full xl:text-xs 2xl:text-sm uppercase': true,
                  [categorie.color]: categorie.slug === route.params.slug,
                  'bg-slate-200 text-white':
                    categorie.slug !== route.params.slug,
                }"
              >
                {{ categorie.title }}
              </button>
            </NuxtLink>
          </div>
          <div v-else>
            <NuxtLink
              :to="`/dashboard/mes-promenades/categorie/${categorie?.slug}`"
            >
              <button
                v-if="route.name === 'dashboard'"
                :class="`category-btn px-8 py-4 mx-2 rounded-full xl:text-xs 2xl:text-sm ${categorie?.color} uppercase`"
              >
                {{ categorie.title }}
              </button>
              <button
                v-else
                :class="{
                  'category-btn': true,
                  'px-8 py-4 mx-2 rounded-full xl:text-xs 2xl:text-sm uppercase': true,
                  [categorie.color]: categorie.slug === route.params.slug,
                  'bg-slate-200 text-white':
                    categorie.slug !== route.params.slug,
                }"
              >
                {{ categorie.title }}
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
