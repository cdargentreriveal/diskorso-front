<script lang="ts" setup>
import { Category } from '~~/types/Categories'
import {
  deleteContentImagePromenade,
  editedPromenade,
  sendContentImagePromenade,
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
              const itemsUpdated = await sendContentImagePromenade(
                config.public.baseURL,
                PromenadeStore.selectPromenade!.content
              )
              const data = reactive({
                id: PromenadeStore.selectPromenade?.id,
                title: PromenadeStore.selectPromenade?.title,
                slug: PromenadeStore.selectPromenade?.slug,
                summary: PromenadeStore.selectPromenade?.summary,
                main_image: url,
                main_image_source:
                  PromenadeStore.selectPromenade?.main_image_source,
                content: itemsUpdated,
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
            const itemsUpdated = await sendContentImagePromenade(
              config.public.baseURL,
              PromenadeStore.selectPromenade!.content
            )
            const data = reactive({
              id: PromenadeStore.selectPromenade?.id,
              title: PromenadeStore.selectPromenade?.title,
              slug: PromenadeStore.selectPromenade?.slug,
              summary: PromenadeStore.selectPromenade?.summary,
              content: itemsUpdated,
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
const selectedCategories = reactive<Category[]>(
  PromenadeStore.selectPromenade?.categories
    ? [...PromenadeStore.selectPromenade.categories]
    : []
)

function addCategories(value: any) {
  if (selectedCategories.includes(value)) {
    selectedCategories.splice(selectedCategories.indexOf(value), 1)
  } else {
    selectedCategories.push(value)
  }
}
function isCheckedArray(item: any) {
  return !!PromenadeStore.selectPromenade?.categories.some(
    (categorie: Category) => categorie.id === item.id
  )
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

const showModal = ref<boolean>(false)
const toggle = () => {
  showModal.value = !showModal.value
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
          <button @click="toggle()">Prévisualiser</button>
        </div>
        <ModalBase :show="showModal" class="modal">
          <div class="relative pb-15">
            <div
              class="closed absolute top-8 right-8 text-lg cursor-pointer text-white"
              @click="toggle()"
            >
              ✕
            </div>
            <div>
              <div
                v-if="PromenadeStore.selectPromenade!.main_image === ''"
                class="h-[40vh] w-full no-image"
              ></div>
              <div
                v-else
                class="promenade_page_banner h-[40vh] w-full bg-center bg-cover"
                :style="{
                  backgroundImage: 'url(' + PromenadeStore.selectPromenade!.main_image + ')',
                }"
              ></div>
              <div
                v-if="PromenadeStore.selectPromenade!.main_image !== ''"
                class="text-right text-xs italic p-3 relative"
              >
                <div
                  class="absolute right-5 w-1/12 text-xs bottom-10 text-white"
                >
                  source : <br />
                  <span class="underline">{{
                    PromenadeStore.selectPromenade!.main_image_source
                  }}</span>
                </div>
              </div>
              <div
                class="promenade_page_content w-9/12 mx-auto bg-white py-20 -mt-40 rounded-xl relative box-shaddow -sm:w-full -sm:py-15"
              >
                <div
                  class="promenade_page_content_avatar w-[80px] h-[80px] rounded-full overflow-hidden absolute -top-10 left-17 -sm:left-10 border border-black border-2"
                >
                  <img
                    v-if="PromenadeStore.selectPromenade!.user.picture === null"
                    src="@/assets/images/test-avatar.jpg"
                    alt="image de profil"
                  />
                  <img
                    v-else
                    :src="PromenadeStore.selectPromenade!.user.picture"
                    alt="image de profil"
                  />
                </div>
                <div class="promenade_page_content_header px-20 -sm:px-10">
                  <div
                    class="promenade_page_content_title text-3xl font-bold -sm:text-2xl"
                  >
                    <h1>{{ PromenadeStore.selectPromenade!.title }}</h1>
                  </div>
                  <div
                    class="promenade_page_content_created flex gap-2 italic text-sm py-4"
                  >
                    <p>
                      Créee le :
                      {{ getDate(PromenadeStore.selectPromenade!.createdAt) }}
                    </p>
                    <span>-</span>

                    <p>
                      par :
                      <span class="underline">{{
                        PromenadeStore.selectPromenade!.user.username
                      }}</span>
                    </p>
                  </div>
                  <div class="flex justify-between items-center">
                    <div class="card-content-categories flex gap-4 py-5">
                      <div
                        v-for="(cat, index) in PromenadeStore.selectPromenade!.categories"
                        :key="index"
                        class="category"
                      >
                        <button
                          :class="
                            cat.color +
                            ' category-btn px-5 py-2 rounded-full text-sm'
                          "
                        >
                          {{ cat.title }}
                        </button>
                      </div>
                    </div>
                  </div>
                  <Separator />
                </div>
                <section class="promenade_page_content_details_transition">
                  <!-- eslint-disable vue/no-v-html -->
                  <div
                    v-if="PromenadeStore.selectPromenade! && PromenadeStore.itemsEdit"
                  >
                    <div
                      v-for="(blocsContent, i) in PromenadeStore.itemsEdit"
                      :key="i"
                      class="px-20 py-5 -sm:px-5 -sm:py-5"
                    >
                      <div
                        v-if="blocsContent.type === 'transition'"
                        class="transition"
                      >
                        <div v-html="blocsContent.content"></div>
                      </div>
                      <div
                        v-if="blocsContent.type === 'excerpt'"
                        class="extrait bg-slate-100 relative py-3"
                      >
                        <div v-html="blocsContent.content"></div>
                        <div class="source text-xs italic text-right mb-3">
                          <span>source: </span>
                          <span class="underline">{{
                            blocsContent.source
                          }}</span>
                        </div>
                      </div>
                      <div
                        v-if="
                          blocsContent.type === 'image' && blocsContent.imageUrl
                        "
                        class="image"
                      >
                        <img
                          :src="blocsContent.imageUrl!"
                          alt=""
                          class="w-full rounded-xl"
                        />
                        <div class="text-right text-xs italic p-3">
                          source :
                          <span class="underline">{{
                            blocsContent.source
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--eslint-enable-->
                </section>
              </div>
            </div>
          </div>
        </ModalBase>
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
        <!-- <div class="seo">
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
        </div> -->
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

.extrait {
  &:after {
    content: '';
    position: absolute;
    height: 100%;
    width: 5rem;
    top: 0;
    background-color: rgba(241, 245, 249, var(--tw-bg-opacity));
    left: -5rem;
  }
  &:before {
    content: '';
    position: absolute;
    height: 100%;
    width: 5rem;
    top: 0;
    background-color: rgba(241, 245, 249, var(--tw-bg-opacity));
    right: -5rem;
  }
}
.no-image {
  background-image: url('@/assets/images/banner-diskorso-promenade-2.jpg');
  background-position: center;
  background-size: cover;
}

.promenade_page {
  &_banner {
    background-size: cover;
    background-position: center;
  }
  &_content {
    &_created {
      color: var(--gray-color);
    }
    &_details {
      &_transition {
        color: var(--gray-color);
        & h2 {
          color: var(--gray-color);
          font-size: 1.5rem;
          font-weight: 600;
        }
        & p {
          margin: 1.5rem 0;
        }
        & article {
          margin: 1.5rem 0;
          padding-right: 1rem;
          /* background-color: #f8f8f8; */
          border-right: 2px solid var(--purple-color);
        }
      }
    }
  }
}
</style>
