<script lang="ts" setup>
import { Category } from '~~/types/Categories'
import {
  deleteContentImagePromenade,
  editedPromenade,
  sendMainImagePromenade,
} from '~~/utils/connected'
import { useCategoryStore } from '~~/store/category'
import { usePromenadeStore } from '~~/store/promenade'

const PromenadeStore = usePromenadeStore()
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
  confirmButtonText: string,
  imageUrl?: string
) => {
  $swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    imageUrl,
  })
}
function submitCreatedPromenade() {
  if (PromenadeStore.selectPromenade?.title === '') {
    displaySwal(
      'Titre manquant',
      'Le titre de la promenade est obligatoire',
      'error',
      'ok'
    )
  } else if (PromenadeStore.selectPromenade?.summary === '') {
    displaySwal(
      'Description manquante',
      'La description de la promenade est obligatoire',
      'error',
      'ok'
    )
  } else if (selectedIds.value.length === 0) {
    displaySwal(
      'Catégorie manquante',
      'Merci de sélectionner au moins une catégorie',
      'error',
      'ok'
    )
  } else {
    $swal
      .fire({
        title: 'Souhaitez-vous?',
        icon: 'question',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        denyButtonColor: '#3085d6',
        confirmButtonText: 'Enregistrer en brouillon',
        denyButtonText: 'Publier la promenade',
        cancelButtonText: 'Fermer',
        cancelButtonMargin: 15,
        width: '48em',
      })
      .then(async (result: any) => {
        if (result.isConfirmed) {
          if (PromenadeStore.isBannerImageChanged) {
            let url = ''
            if (!PromenadeStore.mainImageToUploadEdit.has('file')) {
              url = ''
            } else {
              const image = PromenadeStore.mainImageToUploadEdit
              url = await sendMainImagePromenade(config.public.baseURL, image)
            }
            if (
              url === "L'image est trop grande, elle ne doit pas dépasser 500ko"
            ) {
              displaySwal('Image trop lourde', url, 'error', 'ok')
            } else {
              const data = reactive({
                id: PromenadeStore.selectPromenade?.id,
                title: PromenadeStore.selectPromenade?.title,
                slug: PromenadeStore.selectPromenade?.slug,
                summary: PromenadeStore.selectPromenade?.summary,
                main_image: url,
                main_image_source:
                  PromenadeStore.selectPromenade?.main_image_source,
                content: PromenadeStore.selectPromenade?.content,
                meta_title: 'Titre pour le référencement',
                meta_description: 'Description pour le référencement',
                categoriesIds: selectedIds,
                extractsIds: excerptElementsId,
                published: false,
                publishedAt: PromenadeStore.selectPromenade?.publishedAt,
                mainImageToDelete: true,
              })
              if (PromenadeStore.imagesToDelete.length > 0) {
                const dataToDelete = reactive({
                  imagesToDelete: PromenadeStore.imagesToDelete,
                })
                await deleteContentImagePromenade(
                  config.public.baseURL,
                  dataToDelete
                )
                await PromenadeStore.clearImageToDeleteArray()
              }
              try {
                const response = await editedPromenade(
                  config.public.baseURL,
                  data
                )
                if (!response.success) {
                  displaySwal(
                    'Echec',
                    `${response.data.message}`,
                    'error',
                    'ok'
                  )
                } else {
                  $swal.fire({
                    title: 'Promenade enregistrée!',
                    text: `Votre promenade ${data.title} a bien été enregistrée en brouillon.`,
                    imageHeight: 120,
                    imageUrl: 'https://i.imgur.com/4NZ6uLY.jpg',
                  })
                  PromenadeStore.unsetIsBannerImageChanged()
                  navigateTo('/dashboard')
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
          } else {
            const data = reactive({
              id: PromenadeStore.selectPromenade?.id,
              title: PromenadeStore.selectPromenade?.title,
              slug: PromenadeStore.selectPromenade?.slug,
              summary: PromenadeStore.selectPromenade?.summary,
              content: PromenadeStore.selectPromenade?.content,
              main_image: PromenadeStore.selectPromenade?.main_image,
              main_image_source:
                PromenadeStore.selectPromenade?.main_image_source,
              meta_title: 'Titre pour le référencement',
              meta_description: 'Description pour le référencement',
              categoriesIds: selectedIds,
              extractsIds: excerptElementsId,
              published: false,
              publishedAt: PromenadeStore.selectPromenade?.publishedAt,
              mainImageToDelete: false,
            })
            if (PromenadeStore.imagesToDelete.length > 0) {
              const dataToDelete = reactive({
                imagesToDelete: PromenadeStore.imagesToDelete,
              })
              await deleteContentImagePromenade(
                config.public.baseURL,
                dataToDelete
              )
              await PromenadeStore.clearImageToDeleteArray()
            }
            try {
              const response = await editedPromenade(
                config.public.baseURL,
                data
              )
              if (!response.success) {
                displaySwal('Echec', `${response.data.message}`, 'error', 'ok')
              } else {
                $swal.fire({
                  title: 'Promenade enregistrée!',
                  text: `Votre promenade ${data.title} a bien été enregistrée en brouillon.`,
                  imageHeight: 120,
                  imageUrl: 'https://i.imgur.com/4NZ6uLY.jpg',
                })
                navigateTo('/dashboard')
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
        } else if (result.isDenied) {
          if (PromenadeStore.isBannerImageChanged) {
            let url2 = ''
            if (!PromenadeStore.mainImageToUploadEdit.has('file')) {
              url2 = ''
            } else {
              const image = PromenadeStore.mainImageToUploadEdit
              url2 = await sendMainImagePromenade(config.public.baseURL, image)
            }
            if (
              url2 ===
              "L'image est trop grande, elle ne doit pas dépasser 500ko"
            ) {
              displaySwal('Image trop lourde', url2, 'error', 'ok')
            } else {
              const data = reactive({
                id: PromenadeStore.selectPromenade?.id,
                title: PromenadeStore.selectPromenade?.title,
                slug: PromenadeStore.selectPromenade?.slug,
                summary: PromenadeStore.selectPromenade?.summary,
                main_image: url2,
                main_image_source:
                  PromenadeStore.selectPromenade?.main_image_source,
                content: PromenadeStore.selectPromenade?.content,
                meta_title: 'Titre pour le référencement',
                meta_description: 'Description pour le référencement',
                categoriesIds: selectedIds,
                extractsIds: excerptElementsId,
                published: true,
                publishedAt: new Date().toISOString(),
                mainImageToDelete: true,
              })
              if (PromenadeStore.imagesToDelete.length > 0) {
                const dataToDelete = reactive({
                  imagesToDelete: PromenadeStore.imagesToDelete,
                })
                await deleteContentImagePromenade(
                  config.public.baseURL,
                  dataToDelete
                )
                await PromenadeStore.clearImageToDeleteArray()
              }
              try {
                const response = await editedPromenade(
                  config.public.baseURL,
                  data
                )
                if (!response.success) {
                  displaySwal(
                    'Echec',
                    `${response.data.message}`,
                    'error',
                    'ok'
                  )
                } else {
                  $swal.fire({
                    title: 'Promenade enregistrée!',
                    text: `Votre promenade ${data.title} a bien été enregistrée en brouillon.`,
                    imageHeight: 120,
                    imageUrl: 'https://i.imgur.com/4NZ6uLY.jpg',
                  })
                  PromenadeStore.unsetIsBannerImageChanged()
                  navigateTo('/dashboard')
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
          } else {
            const data = reactive({
              id: PromenadeStore.selectPromenade?.id,
              title: PromenadeStore.selectPromenade?.title,
              slug: PromenadeStore.selectPromenade?.slug,
              summary: PromenadeStore.selectPromenade?.summary,
              content: PromenadeStore.selectPromenade?.content,
              main_image: PromenadeStore.selectPromenade?.main_image,
              main_image_source:
                PromenadeStore.selectPromenade?.main_image_source,
              meta_title: 'Titre pour le référencement',
              meta_description: 'Description pour le référencement',
              categoriesIds: selectedIds,
              extractsIds: excerptElementsId,
              published: true,
              publishedAt: new Date().toISOString(),
              mainImageToDelete: false,
            })
            if (PromenadeStore.imagesToDelete.length > 0) {
              const dataToDelete = reactive({
                imagesToDelete: PromenadeStore.imagesToDelete,
              })
              await deleteContentImagePromenade(
                config.public.baseURL,
                dataToDelete
              )
              await PromenadeStore.clearImageToDeleteArray()
            }
            try {
              const response = await editedPromenade(
                config.public.baseURL,
                data
              )
              if (!response.success) {
                displaySwal('Echec', `${response.data.message}`, 'error', 'ok')
              } else {
                $swal.fire({
                  title: 'Promenade enregistrée!',
                  text: `Votre promenade ${data.title} a bien été enregistrée en brouillon.`,
                  imageHeight: 120,
                  imageUrl: 'https://i.imgur.com/4NZ6uLY.jpg',
                })
                navigateTo('/dashboard')
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
        }
      })
  }
}
// Ajouter catégories
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

const excerptElementsId = computed(() => {
  const excerptElements = PromenadeStore.items.filter(
    (item: any) => item.type === 'excerpt'
  )
  const excerptIds = excerptElements.map((item: any) => item.id)
  return excerptIds
})
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
const isChecked = (categorie: Category) =>
  computed<boolean>(() => selectedCategories.includes(categorie))
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
