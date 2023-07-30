<script lang="ts" setup>
import { Category } from '~~/types/Categories'
import { useCategoryStore } from '~~/store/category'
import { editedExtract } from '~~/utils/connected'
import { useExtractStore } from '~~/store/extracts'
const config = useRuntimeConfig()
const extractsStore = useExtractStore()
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
    id: extractsStore.extractSelected!.id,
    name: extractsStore.extractSelected!.name,
    source: extractsStore.extractSelected!.source,
    content: extractsStore.extractSelected!.content,
    status: extractsStore.extractSelected!.status,
    used_in_article: extractsStore.extractSelected!.used_in_article,
    categoriesIds: selectedCategoryIds,
  })

  try {
    if (selectedCategoryIds.value.length === 0) {
      displaySwal(
        'Catégorie manquante',
        `Merci d'affecter au moins une catégorie`,
        'error',
        'ok'
      )
    } else if (extractsStore.extractSelected!.name === '') {
      displaySwal(
        "Nom de l'extrait manquant",
        `Merci de renseigner un nom à votre extrait`,
        'error',
        'ok'
      )
    } else if (extractsStore.extractSelected!.source === '') {
      displaySwal(
        'Source manquante',
        `Merci de renseigner la source de votre extrait`,
        'error',
        'ok'
      )
    } else if (extractsStore.extractSelected!.content === '') {
      displaySwal(
        'Extrait vide',
        `Merci de renseigner le contenu de votre extrait`,
        'error',
        'ok'
      )
    } else {
      const response = await editedExtract(config.public.baseURL, data)
      if (!response.success && response.statusCode !== 401) {
        displaySwal('Echec', `${response.message}`, 'error', 'ok')
      } else {
        displaySwal(
          'Extrait mis à jour',
          `Votre extrait ${data.name} a bien été mis à jour`,
          'success',
          'Ok'
        )
        selectedCategories.splice(0, selectedCategories.length)
        clearSelectedCategories()
        navigateTo('/dashboard/mes-extraits')
      }
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

const clearSelectedCategories = () => {
  const checkboxes = document.getElementsByName(
    'categories'
  ) as NodeListOf<HTMLInputElement>
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false
  }
}

const showModal = ref<boolean>(false)
const toggle = () => {
  showModal.value = !showModal.value
}

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
const addSelectedCategories = (categories: Category[]) => {
  categories.forEach((category) => {
    const foundCategory = extractsStore.extractSelected?.categories.find(
      (selectedCategory) => {
        return selectedCategory.slug === category.slug
      }
    )
    if (foundCategory) {
      selectedCategories.push(category)
    }
  })
}
function isCheckedArray(item: Category) {
  return !!extractsStore.extractSelected?.categories.some(
    (categorie) => categorie.slug === item.slug
  )
}
function isCheckboxDisabled(categorie: Category): boolean {
  return (
    selectedCategories.length === 3 &&
    !selectedCategories.some((cat) => cat.id === categorie.id)
  )
}
onMounted(() => {
  // Assurez-vous que extractsStore.extractSelected existe et possède l'attribut categories
  if (extractsStore.extractSelected?.categories) {
    addSelectedCategories(categories)
  }
})
const selectedCategoryIds = computed(() => {
  return selectedCategories.map((category) => category.id)
})
</script>
<template>
  <div
    class="menu fixed right-0 top-0 h-[100vh] bg-white 2xl:w-[210px] xl:w-[11vw] border-l-1 border-slate-300 z-10"
  >
    <div class="menu-admin pt-[150px] pb-[25px] h-full">
      <div class="px-5 py-7 grow">
        <div
          class="preview 2xl:w-8/12 mx-auto text-center px-3 py-2 text-xs rounded-md border border-black mt-2"
        >
          <button @click="toggle()">Prévisualiser</button>
        </div>
        <ModalBase :show="showModal">
          <div class="relative">
            <div
              class="closed absolute top-8 right-8 text-lg cursor-pointer"
              @click="toggle()"
            >
              ✕
            </div>
            <div class="p-12 divide-y">
              <div>
                <!-- eslint-disable vue/no-v-html -->
                <div
                  class="text-xs text-justify mt-8"
                  v-html="extractsStore.extractSelected!.content"
                ></div>
                <!--eslint-enable-->
                <div
                  class="text-xs italic font-semibold my-5 text-slate-500 text-right"
                >
                  <a
                    :href="extractsStore.extractSelected!.source"
                    target="_blank"
                    >{{ extractsStore.extractSelected!.source }}</a
                  >
                </div>
              </div>
            </div>
          </div>
        </ModalBase>
        <Separator />
        <div class="categories">
          <div
            class="categories_title xl:text-sm 2xl:text-base font-semibold mb-5"
          >
            <h4>Catégories<sup>*</sup></h4>
          </div>
          <div class="categories_list h-[150px] overflow-auto">
            <ul class="2xl:text-sm xl:text-[12px] -2xl:leading-4">
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
                  :checked="isCheckedArray(categorie)"
                  :disabled="isCheckboxDisabled(categorie)"
                  :value="categorie.title"
                  @change="addCategories(categorie)"
                /><label for="scales"> {{ categorie.title }}</label>
              </li>
            </ul>
          </div>
        </div>
        <Separator />
      </div>
      <div class="published 2xl:px-5 pt-7 pb-[7px]">
        <button
          type="submit"
          class="published_btn 2xl:w-8/12 mx-auto text-center px-4 py-3 text-sm rounded-md text-white block"
          @click.prevent="submitCreatedPromenade"
        >
          <span class="font-semibold">Modifier</span>
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
