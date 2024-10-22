<script lang="ts" setup>
import { Category } from '~~/types/Categories'
import {
  createdPromenade,
  sendContentImagePromenade,
  sendMainImagePromenade,
} from '~~/utils/connected'
import { useCategoryStore } from '~~/store/category'
import { useExtractStore } from '~~/store/extracts'
import { usePromenadeStore } from '~~/store/promenade'
import { useUserStore } from '~~/store/user'

const user = useUserStore()
const extractsStore = useExtractStore()
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
  if (PromenadeStore.creationTitlePromenade === '') {
    displaySwal(
      'Titre manquant',
      'Le titre de la promenade est obligatoire',
      'error',
      'ok'
    )
  } else if (PromenadeStore.creationSummaryPromenade === '') {
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
  } else if (
    PromenadeStore.items
      .filter((item) => item.type === 'image')
      .some((item) => !item.source || item.source.trim() === '')
  ) {
    displaySwal(
      'Source manquante',
      'Merci de remplir la propriété source pour chaque image',
      'error',
      'ok'
    )
  } else {
    $swal
      .fire({
        title: 'Souhaitez-vous ?',
        icon: 'question',
        iconColor: 'rgba(148, 163, 184, 0.5)',
        showCloseButton: true,
        showDenyButton: true,
        confirmButtonColor: '#69B8D9',
        denyButtonColor: '#986FFC',
        confirmButtonText: 'Enregistrer en brouillon',
        denyButtonText: 'Publier la promenade',
        cancelButtonText: 'Annuler',
        cancelButtonMargin: 15,
        width: '48em',
      })
      .then(async (result: any) => {
        if (result.isConfirmed) {
          let url = ''
          // TODO: il faut vérifier avant que PromenadeStore.mainImageToUpload existe
          if (
            Object.keys(PromenadeStore.mainImageToUpload).length === 0 &&
            PromenadeStore.mainImageToUpload.constructor === Object
          ) {
            url = ''
          } else if (!PromenadeStore.mainImageToUpload.has('file')) {
            url = ''
          } else {
            const image = PromenadeStore.mainImageToUpload
            url = await sendMainImagePromenade(config.public.baseURL, image)
          }
          if (
            url === "L'image est trop grande, elle ne doit pas dépasser 500ko"
          ) {
            displaySwal('Image trop lourde', url, 'error', 'ok')
          } else {
            const itemsUpdated = await sendContentImagePromenade(
              config.public.baseURL,
              PromenadeStore.items
            )
            const data = reactive({
              title: PromenadeStore.creationTitlePromenade,
              slug: PromenadeStore.creationSlugPromenade,
              summary: PromenadeStore.creationSummaryPromenade,
              main_image: url,
              main_image_source: PromenadeStore.mainImageSource,
              content: itemsUpdated,
              meta_title: 'Titre pour le référencement',
              meta_description: 'Description pour le référencement',
              categoriesIds: selectedIds,
              extractsIds: excerptElementsId,
              published: false,
              publishedAt: new Date().toISOString(),
            })
            try {
              const response = await createdPromenade(
                config.public.baseURL,
                data
              )
              if (!response.success) {
                displaySwal('Echec', `${response.data.message}`, 'error', 'ok')
              } else {
                $swal.fire({
                  title: 'Promenade enregistrée!',
                  text: `Votre promenade ${data.title} a bien été enregistrée en brouillon.`,
                  imageHeight: 135,
                  imageUrl:
                    'https://diskord-api.s3.eu-west-3.amazonaws.com/file1683741866008.png',
                })
                PromenadeStore.setCreationTitlePromenade('')
                PromenadeStore.setCreationSummaryPromenade('')
                PromenadeStore.setMainImage('')
                PromenadeStore.setmainImageToUpload(new FormData())
                PromenadeStore.removeAllExtract()
                // extractsStore.removeAllExtract()
                PromenadeStore.clearItems()

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
          let url2 = ''
          if (
            Object.keys(PromenadeStore.mainImageToUpload).length === 0 &&
            PromenadeStore.mainImageToUpload.constructor === Object
          ) {
            url2 = ''
          } else if (!PromenadeStore.mainImageToUpload.has('file')) {
            url2 = ''
          } else {
            const image = PromenadeStore.mainImageToUpload
            url2 = await sendMainImagePromenade(config.public.baseURL, image)
          }
          if (
            url2 === "L'image est trop grande, elle ne doit pas dépasser 500ko"
          ) {
            displaySwal('Image trop lourde', url2, 'error', 'ok')
          } else {
            const data = reactive({
              title: PromenadeStore.creationTitlePromenade,
              slug: PromenadeStore.creationSlugPromenade,
              summary: PromenadeStore.creationSummaryPromenade,
              main_image: url2,
              main_image_source: PromenadeStore.mainImageSource,
              content: PromenadeStore.items,
              meta_title: 'Titre pour le référencement',
              meta_description: 'Description pour le référencement',
              categoriesIds: selectedIds,
              extractsIds: excerptElementsId,
              published: true,
              publishedAt: new Date().toISOString(),
            })
            try {
              const response = await createdPromenade(
                config.public.baseURL,
                data
              )
              if (!response.success) {
                displaySwal('Echec', `${response.data.message}`, 'error', 'ok')
              } else {
                $swal.fire({
                  title: 'Promenade créee',
                  text: `Votre promenade ${data.title} a bien été créée et publiée`,
                  imageHeight: 135,
                  imageUrl:
                    'https://diskord-api.s3.eu-west-3.amazonaws.com/file1683741866008.png',
                })
                PromenadeStore.setCreationTitlePromenade('')
                PromenadeStore.setCreationSummaryPromenade('')
                PromenadeStore.setMainImage('')
                PromenadeStore.setmainImageToUpload(new FormData())
                // extractsStore.removeAllExtract()
                PromenadeStore.removeAllExtract()
                PromenadeStore.clearItems()
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
const showModalCreate = ref<boolean>(false)
const toggle = () => {
  showModalCreate.value = !showModalCreate.value
}
</script>
<template>
  <div
    class="menu fixed right-0 top-0 h-[100vh] bg-white 2xl:w-[210px] xl:w-[11vw] border-l-1 border-slate-300 z-10"
  >
    <div class="menu-admin pt-[150px] pb-[25px] h-full">
      <div class="2xl:px-5 2xl:py-7 xl:p-4 grow">
        <div
          class="preview 2xl:w-8/12 mx-auto text-center px-3 py-2 text-xs rounded-md border border-black mt-2"
        >
          <button @click="toggle()">Prévisualiser</button>
        </div>
        <ModalBase :show="showModalCreate" class="modal">
          <div class="relative pb-15">
            <div
              class="closed absolute top-8 right-8 text-lg cursor-pointer"
              :class="
                PromenadeStore.mainImage !== '' ? 'text-white ' : 'text-black '
              "
              @click="toggle()"
            >
              ✕
            </div>
            <div
              v-if="
                PromenadeStore.mainImage !== '' ||
                PromenadeStore.creationTitlePromenade !== '' ||
                PromenadeStore.items.length !== 0
              "
            >
              <div
                v-if="PromenadeStore.mainImage === ''"
                class="h-[40vh] w-full no-image"
              ></div>
              <div
                v-else
                class="promenade_page_banner h-[40vh] w-full bg-center bg-cover"
                :style="{
                  backgroundImage:
                    'url(' + PromenadeStore.mainImage + ')' ?? false,
                }"
              ></div>
              <div
                v-if="PromenadeStore.mainImage !== '' ?? false"
                class="text-right text-xs italic p-3"
              >
                <div
                  class="absolute right-5 w-1/12 text-xs bottom-10 text-white"
                >
                  source : <br />
                  <span class="underline">{{
                    PromenadeStore.mainImageSource
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
                    v-if="user.currentUser?.picture === null"
                    src="@/assets/images/avatar-dk.jpg"
                    alt="image de profil"
                  />
                  <img
                    v-else
                    :src="user.currentUser?.picture"
                    alt="image de profil"
                  />
                </div>
                <div class="promenade_page_content_header px-20 -sm:px-10 xs">
                  <div
                    class="promenade_page_content_title xl:text-2xl 2xl:text-3xl font-bold -sm:text-2xl"
                  >
                    <h1>{{ PromenadeStore.creationTitlePromenade }}</h1>
                  </div>
                  <div
                    class="promenade_page_content_created flex gap-2 italic text-sm py-4"
                  >
                    <p>
                      Créée le :
                      {{ getDate(new Date().toISOString()) }}
                    </p>
                    <span>-</span>

                    <p>
                      par :
                      <span class="underline">{{
                        user.currentUser?.username
                      }}</span>
                    </p>
                  </div>
                  <div class="flex justify-between items-center">
                    <div
                      class="card-content-categories flex flex-wrap gap-4 py-5 -md:gap-2"
                    >
                      <div
                        v-for="(cat, index) in selectedCategories"
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
                  <p class="mt-5 text-sm italic gray-color">
                    Description : {{ PromenadeStore.creationSummaryPromenade }}
                  </p>
                  <Separator />
                </div>
                <section class="promenade_page_content_details_transition">
                  <!-- eslint-disable vue/no-v-html -->
                  <div v-if="PromenadeStore.items">
                    <div
                      v-for="(blocsContent, i) in PromenadeStore.items"
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
                          :src="blocsContent.imageUrl ?? false"
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
            <div
              v-else
              class="empty-preview h-[40vh] flex items-center justify-center"
            >
              <div class="content text-slate-600">Votre promenade est vide</div>
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
      <div class="published 2xl:px-5 pt-7 pb-[7px]">
        <button
          type="submit"
          class="published_btn 2xl:w-8/12 mx-auto text-center px-4 py-3 text-sm rounded-md text-white block"
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
