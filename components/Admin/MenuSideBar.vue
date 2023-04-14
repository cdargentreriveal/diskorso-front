<script lang="ts" setup>
import { Category } from '~~/types/Categories'
import { createdPromenade } from '~~/utils/connected'
import { useCategoryStore } from '~~/store/category'
const config = useRuntimeConfig()

const categoriesStore = useCategoryStore()
const categories = categoriesStore.categories
definePageMeta({
  layout: 'page',
})
const { $swal } = useNuxtApp()
const displaySwal = (
  title: string,
  text: string,
  icon: string,
  confirmButtonText: string
) => {
  $swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
  })
}
async function submitCreatedPromenade() {
  const data = reactive({
    title: propsAdminMenuSideBar.title,
    slug: propsAdminMenuSideBar.slug,
    summary: propsAdminMenuSideBar.summary,
    main_image: propsAdminMenuSideBar.mainImage,
    content: propsAdminMenuSideBar.content,
    meta_title: 'Titre pour le référencement',
    meta_description: 'Description pour le référencement',
    categoriesIds: selectedIds,
    extractsIds: [],
    published: propsAdminMenuSideBar.published,
  })

  try {
    const response = await createdPromenade(config.public.baseURL, data)
    if (response.error) {
      displaySwal('Echec', `${response.message}`, 'error', 'ok')
    } else {
      displaySwal(
        'Promenade créee',
        `Votre promenade ${data.title} a bien été créée`,
        'success',
        'Ok'
      )
    }
  } catch (error) {
    displaySwal(
      'Erreur lors de la création',
      'Une erreur est survenue lors de la création de votre promenade. Veuillez réessayer plus tard.',
      'error',
      'Ok'
    )
  }
}

const propsAdminMenuSideBar = defineProps({
  title: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
    default: '',
  },
  mainImage: {
    type: String,
    default: '',
  },
  summary: {
    type: String,
    default: '',
  },
  content: {
    type: Array,
    default: () => [],
  },
  published: {
    type: Boolean,
    default: false,
  },
  actionBtn: {
    type: Object,
    default() {
      return {}
    },
  },
})
// Ajouter catégories
const categoriesCount = ref<number>(0)
interface CategoryItem {
  type: 'categories'
  content: number
}
interface MetaTitleItem {
  type: 'metaTitle'
  content: string
}
interface MetaDescriptionItem {
  type: 'metaDescription'
  content: string
}
type ItemType = CategoryItem | MetaTitleItem | MetaDescriptionItem
const items = ref<ItemType[]>([])
const selectedCategories = reactive<Category[]>([])

function addCategories(value: any) {
  if (selectedCategories.includes(value)) {
    selectedCategories.splice(selectedCategories.indexOf(value), 1)
  } else {
    selectedCategories.push(value)
  }
}
function isCheckboxDisabled(categorie: Category): boolean {
  return (
    selectedCategories.length === 3 && !selectedCategories.includes(categorie)
  )
}
const selectedIds = computed(() => {
  return selectedCategories.map((category) => category.id)
})
function addMetaTitle(event: Event): void {
  const value = (event.target as HTMLInputElement).value
  items.value.push({ type: 'metaTitle', content: value })
}
function addMetaDescription(event: Event): void {
  const value = (event.target as HTMLInputElement).value
  items.value.push({ type: 'metaDescription', content: value })
}
</script>
<template>
  <div
    class="menu fixed right-0 top-0 h-[100vh] bg-white w-[220px] border-l-1 border-slate-300 z-10"
  >
    <div class="menu-admin pt-[150px] pb-[25px] h-full">
      <div class="px-5 py-7 grow">
        <div
          class="preview w-8/12 mx-auto text-center px-3 py-2 text-xs rounded-md border border-black mt-2"
        >
          <button>Prévisualiser</button>
        </div>
        <Separator />
        <div class="categories">
          <div class="categories_title text-base font-semibold mb-5">
            <h4>Catégories<sup>*</sup></h4>
          </div>
          <div class="categories_list h-[150px] overflow-auto">
            <ul class="text-sm">
              <li
                v-for="(categorie, index) in categories"
                :key="index"
                class="flex my-2"
              >
                <input
                  :id="`checkbox-${categorie?.id}`"
                  type="checkbox"
                  name="categories"
                  class="mx-2"
                  :disabled="isCheckboxDisabled(categorie)"
                  :value="categorie.title"
                  @change="addCategories(categorie)"
                /><label for="scales"> {{ categorie.title }}</label>
              </li>
            </ul>
          </div>
        </div>
        <Separator />
        <div class="seo">
          <div class="seo_title text-base font-semibold mb-5">
            <h4>SEO</h4>
          </div>
          <div class="seo_meta_title mb-4 text-sm">
            <label class="font-medium">Meta title</label>
            <input
              type="text"
              name="scales"
              class="my-2 p-2 text-xs border border-slate-300 rounded w-full h-[30px]"
              maxlength="30"
              @change="addMetaTitle($event)"
            />
          </div>
          <div class="seo_meta_description text-sm">
            <label class="font-medium">Meta description</label>
            <textarea
              type="text"
              name="scales"
              class="my-2 p-2 text-xs border border-slate-300 rounded w-full h-full max-h-[68px]"
              maxlength="120"
              @change="addMetaDescription($event)"
            />
          </div>
        </div>
      </div>
      <div class="published px-5 pt-7 pb-[7px]">
        <button
          type="submit"
          class="published_btn w-8/12 mx-auto text-center px-4 py-3 text-sm rounded-md text-white block"
          @click.prevent="submitCreatedPromenade"
        >
          <span class="font-semibold">Enregistrer</span>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.menu-admin {
  display: flex;
  flex-direction: column;
}

.grow {
  flex-grow: 1;
}
.published_btn {
  background-color: #50d6b7;
}
sup {
  color: #f55a78;
}
</style>
