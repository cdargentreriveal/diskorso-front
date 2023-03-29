<script lang="ts" setup>
import { Category } from '~~/types/Categories'
definePageMeta({
  layout: 'page',
})
const config = useRuntimeConfig()
async function submitForm() {
  const data = {
    title: propsAdminMenuSideBar.title,
    slug: propsAdminMenuSideBar.slug,
    summary: 'Résumé de la promenade',
    main_image: "url-de-l'image",
    content: 'Contenu de la promenade',
    meta_title: 'Titre pour le référencement',
    meta_description: 'Description pour le référencement',
    categoriesIds: [1, 2, 3],
    extractsIds: [4, 5, 6],
  }

  try {
    const response = await fetch(
      `${config.public.baseURL}/promenadeditor/create-promenade`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )

    if (response.ok) {
      // Handle successful response
    } else {
      // Handle failed response
    }
  } catch (error) {
    console.error(error)
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
  main_image: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    default() {
      return {}
    },
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
  content: string
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

function addCategories(event: Event): void {
  const value = (event.target as HTMLInputElement).value
  if (categoriesCount.value < 3) {
    items.value.push({ type: 'categories', content: value })
    categoriesCount.value++
  }
}
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
          class="preview w-8/12 mx-auto text-center px-3 py-2 text-xs rounded-md border border-black"
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
              <li class="flex my-2">
                <input
                  id="scales"
                  type="checkbox"
                  name="scales"
                  class="mx-2"
                  value="Histoire"
                  @change="addCategories($event)"
                /><label for="scales">Histoire</label>
              </li>
              <li class="flex my-2">
                <input
                  id="scales"
                  type="checkbox"
                  name="scales"
                  class="mx-2"
                  value="Science"
                  @change="addCategories($event)"
                /><label for="scales">Science</label>
              </li>
              <li class="flex my-2">
                <input
                  id="scales"
                  type="checkbox"
                  name="scales"
                  class="mx-2"
                  value="Société"
                  @change="addCategories($event)"
                /><label for="scales">Société</label>
              </li>
              <li class="flex my-2">
                <input
                  id="scales"
                  type="checkbox"
                  name="scales"
                  class="mx-2"
                  value="Société"
                  @change="addCategories($event)"
                /><label for="scales">Littérature</label>
              </li>
              <li class="flex my-2">
                <input
                  id="scales"
                  type="checkbox"
                  name="scales"
                  class="mx-2"
                  value="Société"
                  @change="addCategories($event)"
                /><label for="scales">Sport</label>
              </li>
              <li class="flex my-2">
                <input
                  id="scales"
                  type="checkbox"
                  name="scales"
                  class="mx-2"
                  value="Société"
                  @change="addCategories($event)"
                /><label for="scales">Culture</label>
              </li>
              <li class="flex my-2">
                <input
                  id="scales"
                  type="checkbox"
                  name="scales"
                  class="mx-2"
                  value="Société"
                  @change="addCategories($event)"
                /><label for="scales">Nature</label>
              </li>
              <li class="flex my-2">
                <input
                  id="scales"
                  type="checkbox"
                  name="scales"
                  class="mx-2"
                  value="Société"
                  @change="addCategories($event)"
                /><label for="scales">Société</label>
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
              class="my-2 p-2 text-xs border border-slate-300 rounded w-full h-full max-h-[75px]"
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
          @click.prevent="submitForm"
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
