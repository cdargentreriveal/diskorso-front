<script lang="ts" setup>
import Sortable from 'sortablejs'
import { BtnAdminPage } from '@/types/AdminTitlePage'
import { ExtractFetched } from '~~/types/Extracts'
import WysiwygEditor from '~/components/WYSIWYG/WysiwygEditor.vue'
import { useExtractStore } from '~~/store/extracts'
definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})

const extractsStore = useExtractStore()
const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'button',
    titleBlack: 'Créer une',
    titlePurple: 'promenade',
    actionBtn: [{ action: 'Publier' }, { action: 'Brouillon' }],
  },
])
const config = useRuntimeConfig()
let xsrfToken: any = null
if (process.client) {
  xsrfToken = localStorage.getItem('xsrfToken')
}

type Response = {
  data: ExtractFetched[]
  message: string
  success: boolean
}

const { data: response } = await useAsyncData<Response>('response', () =>
  $fetch(`${config.public.baseURL}/extract/user-connected/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${xsrfToken}`,
    },
    credentials: 'include',
  })
)
const extracts = computed(() => {
  if (response.value === null) {
    return []
  } else {
    return response.value.data.map((extract) => ({
      ...extract,
    }))
  }
})
const publishedPromenade = ref<Boolean>(false)
const handleMyEvent = (value: boolean) => {
  publishedPromenade.value = value
}
const avatarUrl = ref('')
const fileInput = ref<HTMLInputElement>()

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    const image = new Image()
    image.onload = () => {
      avatarUrl.value = reader.result as string
    }
    image.src = reader.result as string
  }
  reader.readAsDataURL(file)
}

function deletePicturesBanner() {
  avatarUrl.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
const titleInput = ref('')
const slugTitleInput = ref('')
const summaryPromenade = ref('')
function setTitleInput(value: String) {
  slugTitleInput.value = value.replace(/ /g, '-')
}
// Ajouter blocs à la volée

interface ImageItem {
  type: 'image'
  file: File | null
  imageUrl: string | null
}

interface TransitionItem {
  type: 'transition'
  content: string
}

interface ExcerptItem {
  type: 'excerpt'
  id: number
  index: number
  content: string
}

type ItemType = ImageItem | TransitionItem | ExcerptItem

const items = ref<ItemType[]>([])
const imageCount = ref<number>(0)
const transitionCount = ref<number>(0)
const excerptCount = ref<number>(0)

function addImageInput(): void {
  if (imageCount.value < 4) {
    items.value.push({ type: 'image', file: null, imageUrl: null })
    imageCount.value++
  }
}

function addTransitionInput(): void {
  if (transitionCount.value < 10) {
    items.value.push({ type: 'transition', content: '' })
    transitionCount.value++
  }
}
const isExcerptAdded = ref<boolean[]>([false, false, false, false])
function addExcerptBlock(content: string, id: number, index: number): void {
  if (excerptCount.value < 4) {
    // Vérifier si l'extrait est déjà présent
    const existingExcerpt = items.value.find(
      (item) => item.type === 'excerpt' && item.id === id,
      (isExcerptAdded.value[id] = true)
    )
    if (existingExcerpt) {
      return
    }

    // Ajouter l'extrait s'il n'est pas déjà présent
    items.value.push({
      type: 'excerpt',
      id,
      index,
      content,
    })
    excerptCount.value++
  }
}

function removeItem(index: number, id: number): void {
  const type = items.value[index].type

  if (type === 'image') {
    imageCount.value--
  } else if (type === 'transition') {
    transitionCount.value--
  } else if (type === 'excerpt') {
    excerptCount.value--
    isExcerptAdded.value[id] = false
  }
  items.value.splice(index, 1)
}

function handleImageUpload(event: Event, index: number): void {
  const file = (event.target as HTMLInputElement).files?.[0]

  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    const imageUrl = reader.result as string // Récupérer l'URL de l'image depuis le reader

    const image = new Image()
    image.onload = () => {
      // Mettre à jour l'objet correspondant à l'input
      const item = items.value[index]
      if (item.type === 'image') {
        item.file = file
        // item.imageUrl = imageUrl // Mettre à jour l'URL de l'image dans l'objet
        item.imageUrl =
          'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_960_720.jpg'
      }
    }
    image.src = imageUrl // Charger l'image avec l'URL
  }
  reader.readAsDataURL(file)
}
// Calculer si une photo est sélectionnée
const hasAvatar = computed(() => !!avatarUrl.value)
// mettre a jour le tableau ITEMS dans updatedItemsPublished pour envoyer les bonnes positions des elements au back
const updatedItemsPublished = ref(items.value)
const blocTransition = ref<HTMLElement | null>(null)
onMounted(() => {
  if (blocTransition.value) {
    const sortableTransition = new Sortable(blocTransition.value, {
      group: 'bloc',
      handle: '.drag',
      animation: 250,
      onEnd: (event: any) => {
        const newIndex = event.newIndex
        const oldIndex = event.oldIndex
        const updatedItems = [...updatedItemsPublished.value]
        updatedItems.splice(newIndex, 0, updatedItems.splice(oldIndex, 1)[0])
        updatedItemsPublished.value = updatedItems
      },
    })
  }
  const descriptionCard = document.querySelectorAll('.extraits_item_text')
  if (descriptionCard) {
    descriptionCard.forEach((element) => {
      const shortDescription = element.textContent?.substring(0, 100) ?? ''
      element.textContent = shortDescription + '...'
    })
  }
})

const toggle = (extract: any): boolean => {
  extract.showModal = !extract.showModal
  return extract.showModal
}
</script>

<template>
  <AdminMenu />
  <div class="container mx-auto">
    <AdminTitle
      v-if="datasTitle[0].type === 'button'"
      :title-black="datasTitle[0].titleBlack"
      :title-purple="datasTitle[0].titlePurple"
      :data="datasTitle[0].data"
      :action-btn="datasTitle[0].actionBtn"
      @my-event="handleMyEvent"
    />
    <div class="container_promenade w-9/12 mx-auto flex gap-8">
      <div class="w-4/12 relative">
        <div class="extraits w-11/12 text-xs mb-3 sticky top-[22%]">
          <div class="mb-6 flex items-center justify-between">
            <div class="underline mx-3">
              <NuxtLink to="/dashboard/mes-extraits"
                >Accéder aux extraits</NuxtLink
              >
            </div>
            <div class="underline mx-3">
              <NuxtLink to="/dashboard/creer-un-extrait"
                >+ Créer un extrait</NuxtLink
              >
            </div>
          </div>
          <div
            v-if="extractsStore.extracts.length < 1"
            class="empty-extract h-[50vh] flex items-center justify-center border-dashed border border-slate-400 text-slate-400"
          >
            <div>Pas d'extraits sélectionnés</div>
          </div>
          <div v-else class="h-[53vh] overflow-auto">
            <div
              v-for="(extract, index) in extractsStore.extracts"
              :key="index"
              class="extraits_item bg-white rounded mb-5 p-5"
            >
              <div class="extraits_item_title text-sm font-semibold mb-2">
                <h3>{{ extract.name }}</h3>
              </div>
              <div class="extraits_item_cats flex gap-2 flex-wrap">
                <div
                  v-for="(cat, indexCat) in extract.categories"
                  :key="indexCat"
                  class="cats category-btn px-4 py-2 rounded-full inline mb-1"
                  :class="cat.color"
                >
                  {{ cat.title }}
                </div>
              </div>
              <div class="extraits_item_text my-3">
                <p>{{ extract.content }}</p>
              </div>
              <div class="btns mt-4">
                <div class="flex items-center justify-between">
                  <div
                    class="extraits_view underline font-semibold"
                    @click="toggle(extract)"
                  >
                    Voir l'extrait
                  </div>
                  <ModalBase :show="extract.showModal">
                    <div class="p-4 px-15 divide-y">
                      <div>
                        <div class="text-lg font-semibold my-8 text-slate-500">
                          {{ extract.name }}
                        </div>
                        <!-- eslint-disable vue/no-v-html -->
                        <div
                          class="text-xs text-justify"
                          v-html="extract.content"
                        ></div>
                        <!--eslint-enable-->
                        <div
                          class="text-xs italic font-semibold my-5 text-slate-500 text-right"
                        >
                          <a :href="extract.source" target="_blank">{{
                            extract.source
                          }}</a>
                        </div>
                      </div>
                      <div class="flex flex-col">
                        <p
                          v-if="extract.used_in_article"
                          class="text-xs mt-5 font-semibold"
                        >
                          Cet extrait apparaît dans les promenades suivantes :
                        </p>
                        <p v-else class="text-xs mt-5 font-semibold">
                          Extrait non encore utilisé
                        </p>
                        <div class="self-end">
                          <button
                            type="button"
                            class="w-100px bg-indigo-200 px-3 py-1 font-medium"
                            @click="toggle(extract)"
                          >
                            Fermer
                          </button>
                        </div>
                      </div>
                    </div>
                  </ModalBase>
                  <div
                    :class="{
                      'cursor-not-allowed disabled':
                        excerptCount === 4 || isExcerptAdded[extract.id],
                    }"
                    class="btn_add_extrait extrait_btn px-3 py-2 rounded text-white"
                    @click="addExcerptBlock(extract.content, extract.id, index)"
                  >
                    <button>Ajouter l'extrait</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-8/12 relative">
        <div class="promenade_title font-semibold text-lg mb-8">
          <div class="flex items-center justify-between">
            <h2>Titre de la promenade<sup>*</sup></h2>
            <div class="max_words font-normal text-xs italic">
              40 caractères max
            </div>
          </div>
          <div class="my-2">
            <input
              v-model="titleInput"
              type="text"
              name="scales"
              class="my-2 p-2 text-sm border border-slate-300 rounded w-full h-[40px]"
              maxlength="40"
              @change="setTitleInput(titleInput)"
            />
          </div>
        </div>
        <div class="promenade_image font-semibold text-lg mb-10">
          <h2>Ajouter la photo mise en avant</h2>
          <div class="my-5">
            <label for="avatar-upload text-sm">
              <input
                id="avatar-upload"
                ref="fileInput"
                type="file"
                accept="image/*"
                class="text-sm"
                :class="!hasAvatar ? 'inherit' : 'hidden'"
                @change="handleFileUpload"
              />
              <div
                v-if="hasAvatar"
                class="banner h-[300px] w-full overflow-hidden"
              >
                <div class="flex h-full w-full items-start p-2">
                  <img
                    :src="avatarUrl"
                    type="file"
                    name="files"
                    class="object-cover h-full w-full rounded-lg block"
                    alt=""
                  />
                  <div
                    class="delete ml-2 w-[15px] cursor-pointer"
                    @click="deletePicturesBanner"
                  >
                    <img
                      src="@/assets/images/icons/corbeille.svg"
                      alt=""
                      class="w-full"
                    />
                  </div>
                </div>
              </div>
              <div
                v-if="hasAvatar"
                class="source py-2 w-full flex items-center"
              >
                <label class="text-sm pr-5">Source : <sup>*</sup></label
                ><input
                  class="p-3 border-b-1 border-slate-300 text-xs focus:outline-none w-6/12 bg-transparent text-slate-400"
                  type="text"
                  placeholder="Le nom de la source"
                />
              </div>
            </label>
          </div>
        </div>
        <div class="promenade_description font-semibold text-lg mb-8">
          <div class="flex items-center justify-between">
            <h2>Ajouter une description<sup>*</sup></h2>
            <div class="max_words font-normal text-xs italic">
              350 caractères max
            </div>
          </div>
          <textarea
            v-model="summaryPromenade"
            type="text"
            name="scales"
            class="my-2 p-2 text-sm border border-slate-300 rounded w-full"
            maxlength="350"
          />
        </div>

        <!-- blocs construction promenade -->
        <div ref="blocTransition" class="promenadeContainer">
          <div v-for="(item, index) in items" :key="index" class="bloc">
            <!-- Image input -->
            <div
              v-if="item.type === 'image'"
              class="flex justify-between py-6 items-start"
            >
              <div class="my-2 w-full drag">
                <label for="avatar-upload text-sm">
                  <input
                    id="avatar-upload"
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="text-sm"
                    :class="!item.imageUrl ? 'inherit' : 'hidden'"
                    @change="handleImageUpload($event, index)"
                  />
                  <div
                    v-if="item.imageUrl"
                    class="banner h-[300px] w-full overflow-hidden cursor-move"
                  >
                    <div class="flex h-full w-full items-start p-2">
                      <img
                        :src="item.imageUrl"
                        type="file"
                        name="files"
                        class="object-cover h-full w-full rounded-lg block"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
              <button class="mt-4" @click="removeItem(index, index)">
                <img
                  src="@/assets/images/icons/corbeille.svg"
                  alt=""
                  class="w-[15px]"
                />
              </button>
            </div>

            <!-- Transition input -->
            <div
              v-if="item.type === 'transition'"
              class="flex justify-between py-6 items-start"
            >
              <div class="w-full">
                <WysiwygEditor
                  v-model="item.content"
                  @update:value="(value) => (item.content = value)"
                />
              </div>
              <div class="btns">
                <button
                  class="p-[14px] border border-slate-300"
                  @click="removeItem(index, index)"
                >
                  <img
                    src="@/assets/images/icons/corbeille.svg"
                    alt=""
                    class="w-[15px]"
                  />
                </button>
                <div
                  class="h-[251px] border border-slate-300 flex items-center justify-center drag cursor-move"
                >
                  <img
                    src="@/assets/images/icons/drag.svg"
                    alt=""
                    class="w-[15px]"
                  />
                </div>
              </div>
            </div>

            <!-- Excerpt block -->
            <div
              v-if="item.type === 'excerpt'"
              class="flex justify-between py-6 items-start"
            >
              <div
                class="bg-white rounded-md p-5 w-full mr-5 cursor-move text-sm drag"
              >
                <!-- eslint-disable vue/no-v-html -->
                <div v-html="item.content"></div>
              </div>
              <button @click="removeItem(index, item.id)">
                <img
                  src="@/assets/images/icons/corbeille.svg"
                  alt=""
                  class="w-[15px]"
                />
              </button>
            </div>
          </div>
        </div>
        <!-- bloc encart vide pour stipuler qu'il faut ajouter un élément -->
        <div class="promenade_bloc_empty text-center mt-10 mb-[120px]">
          <div
            class="promenade_bloc_empty_el p-8 border-dashed border border-slate-300 text-slate-300"
          >
            Ajouter un extrait, une transition ou une image
          </div>
        </div>
        <!-- bouton ajouter une image et / ou une transition -->
        <div class="promenade_btns fixed bottom-0 left-0 py-8 w-full">
          <div class="promenade_btns_add container mx-auto">
            <div class="flex gap-12 justify-end items-center w-9/12 mx-auto">
              <div
                class="promenade_btn_image px-4 py-3 text-sm rounded text-white"
                :class="imageCount === 4 ? 'cursor-not-allowed disabled' : ''"
                @click="addImageInput"
              >
                <button :class="imageCount === 4 ? 'cursor-not-allowed' : ''">
                  Ajouter une image
                </button>
              </div>
              <div
                class="promenade_btn_transition px-4 py-3 text-sm rounded text-white"
                @click="addTransitionInput"
              >
                <button>Ajouter une transition</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AdminMenuSideBar
    :title="titleInput"
    :slug="slugTitleInput"
    :main-image="avatarUrl"
    :summary="summaryPromenade"
    :content="updatedItemsPublished"
    :published="!!publishedPromenade"
  />
</template>
<style scoped lang="scss">
.action-button {
  background-color: var(--purple-color);
}
sup {
  color: #f55a78;
}
.promenade_btns {
  background-color: #f8f8f8;
}
.promenade_btn_image {
  background-color: var(--blue-color);
}
.promenade_btn_image.disabled,
.btn_add_extrait.disabled {
  background-color: rgb(209 213 219);
}
.promenade_btn_transition,
.extrait_btn {
  background-color: var(--purple-color);
}

.extraits_view:hover {
  cursor: pointer;
}
</style>
