<script lang="ts" setup>
import Sortable from 'sortablejs'
import { BtnAdminPage } from '@/types/AdminTitlePage'
import WysiwygEditor from '~/components/WYSIWYG/WysiwygEditor.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})

const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'button',
    titleBlack: 'Créer une',
    titlePurple: 'promenade',
    actionBtn: [{ action: 'Voir tutoriel' }],
    route: { name: 'dashboard/tutoriel' },
  },
])

let xsrfToken: any = null
if (process.client) {
  xsrfToken = localStorage.getItem('xsrfToken')
}

const publishedPromenade = ref<Boolean>(false)
const handleMyEvent = (value: boolean) => {
  publishedPromenade.value = value
}
const fileInput = ref<HTMLInputElement>()

interface ImageItem {
  type: 'image'
  file: File | null
  imageUrl: string | null
  id?: number
  key: string
  editorRefName?: string
  content?: string
}

interface TransitionItem {
  type: 'transition'
  content: string
  key: string
  editorRefName: string
}

interface ExcerptItem {
  type: 'excerpt'
  id: number
  index: number
  content: string
  key: string
  editorRefName?: string
}

type ItemType = ImageItem | TransitionItem | ExcerptItem
const items = ref<ItemType[]>([])
const keys = ref([])
const imageCount = ref<number>(0)
const transitionCount = ref<number>(0)
const excerptCount = ref<number>(0)

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
      key: generateUniqueId(),
    })
    excerptCount.value++
  }
}
function addImageInput(): void {
  if (imageCount.value < 4) {
    items.value.push({
      type: 'image',
      file: null,
      imageUrl: null,
      key: generateUniqueId(),
    })
    imageCount.value++
  }
}
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9)
}
const editorRefNames = ref<string[]>([])
function addTransitionInput(): void {
  if (transitionCount.value < 10) {
    const id = items.value.length // Utiliser le prochain index disponible comme ID
    let editorRefName: string
    let i = 0
    do {
      i++
      editorRefName = `editorRef-${id}-${i}` // Générer un nom unique pour la référence de l'éditeur
    } while (editorRefNames.value.includes(editorRefName)) // Répéter jusqu'à ce que le nom soit unique
    editorRefNames.value.push(editorRefName) // Ajouter le nom de référence à la liste
    items.value.push({
      type: 'transition',
      content: '',
      editorRefName,
      key: generateUniqueId(),
    })
    transitionCount.value++
  }
}
const updatedItemsPublished = ref(items.value)
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

// mettre a jour le tableau ITEMS dans updatedItemsPublished pour envoyer les bonnes positions des elements au back
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
        const updatedItems = [...items.value] // créer une copie du tableau
        const [removed] = updatedItems.splice(oldIndex, 1) // supprimer l'élément à l'ancienne position
        updatedItems.splice(newIndex, 0, removed) // insérer l'élément à la nouvelle position
        items.value = updatedItems // mettre à jour le tableau d'origine
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
      :route="datasTitle[0].route.name"
      @my-event="handleMyEvent"
    />
    <div class="container_promenade w-9/12 mx-auto flex gap-8">
      <CreatePromenadeHandleExtracts
        :add-excerpt-block="addExcerptBlock"
        :is-excerpt-added="isExcerptAdded"
      />

      <div class="w-8/12 relative">
        <CreatePromenadeTitle />
        <CreatePromenadeMainImage />
        <CreatePromenadeDescription />
        <!-- blocs construction promenade -->
        <div ref="blocTransition" class="promenadeContainer">
          <div v-for="(item, index) in items" :key="item.key" class="bloc">
            <div
              v-if="item.type === 'image'"
              class="flex justify-between py-6 items-stretch"
            >
              <div class="w-full border border-slate-300 p-8 min-h-min">
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
              <div class="btns">
                <button
                  class="p-[14px] border border-slate-300"
                  @click="removeItem(index, index)"
                >
                  <img
                    src="@/assets/images/icons/corbeille.svg"
                    alt=""
                    class="w-[15px] h-[15px]"
                  />
                </button>
                <div
                  class="border border-slate-300 p-3 text-center text-xs text-slate-400"
                >
                  {{ index + 1 }}
                </div>
                <div
                  class="border bloc-drag border-slate-300 flex items-center justify-center drag cursor-move py-5"
                >
                  <img
                    src="@/assets/images/icons/drag.svg"
                    alt=""
                    class="w-[15px]"
                  />
                </div>
              </div>
            </div>
            <!-- Transition input -->
            <div
              v-if="item.type === 'transition'"
              class="flex justify-between py-6 items-stretch"
            >
              <div class="w-full">
                <WysiwygEditor
                  :content="item.content"
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
                    class="w-[15px] h-[15px]"
                  />
                </button>
                <div
                  class="border border-slate-300 p-3 text-center text-xs text-slate-400"
                >
                  {{ index + 1 }}
                </div>
                <div
                  class="h-full bloc-drag border border-slate-300 flex items-center justify-center drag cursor-move"
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
              class="flex justify-between py-6 items-stretch"
            >
              <div
                class="bg-white p-5 w-full cursor-move text-sm border border-slate-300 min-h-min"
              >
                <!-- eslint-disable vue/no-v-html -->
                <div v-html="item.content"></div>
              </div>
              <div class="btns">
                <button
                  class="p-[14px] border border-slate-300"
                  @click="removeItem(index, item.id)"
                >
                  <img
                    src="@/assets/images/icons/corbeille.svg"
                    alt=""
                    class="w-[15px] h-[15px]"
                  />
                </button>
                <div
                  class="border border-slate-300 p-3 text-center text-xs text-slate-400"
                >
                  {{ index + 1 }}
                </div>
                <div
                  class="border bloc-drag border-slate-300 flex items-center justify-center py-5 drag cursor-move"
                >
                  <img
                    src="@/assets/images/icons/drag.svg"
                    alt=""
                    class="w-[15px]"
                  />
                </div>
              </div>
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
  <AdminMenuSideBar :content="items" :published="!!publishedPromenade" />
</template>
<style scoped lang="scss">
.action-button {
  background-color: var(--purple-color);
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
.bloc-drag {
  height: calc(100% - 87px);
}
</style>
