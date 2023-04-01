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
    actionBtn: [{ action: 'Publier' }, { action: 'Archiver' }],
  },
])
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

function addExcerptBlock(): void {
  // TODO: Récupérer les données de l'extrait et les ajouter à l'array
  if (excerptCount.value < 4) {
    items.value.push({
      type: 'excerpt',
      content: "Contenu de l'extrait",
    })
    excerptCount.value++
  }
}

function removeItem(index: number): void {
  const type = items.value[index].type

  if (type === 'image') {
    imageCount.value--
  } else if (type === 'transition') {
    transitionCount.value--
  } else if (type === 'excerpt') {
    excerptCount.value--
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

const blocTransition = ref<HTMLElement | null>(null)

onMounted(() => {
  if (blocTransition.value) {
    const sortableTransition = Sortable.create(blocTransition.value, {
      group: 'bloc',
      animation: 250,
/*       onEnd: (event: any) => {
        const newIndex = event.newIndex
        const oldIndex = event.oldIndex

        const updatedItems = [...items.value]
        updatedItems.splice(newIndex, 0, updatedItems.splice(oldIndex, 1)[0])
        items.value = updatedItems
      }, */
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
    />
    <div class="container_promenade w-9/12 mx-auto flex gap-8">
      <div class="w-4/12 relative">
        <div
          class="extraits w-11/12 bg-white rounded p-5 text-xs mb-3 sticky top-[22%]"
        >
          <div class="extraits_item">
            <div class="extraits_item_title text-sm font-semibold mb-2">
              <h3>Titre 1</h3>
            </div>
            <div class="extraits_item_cats flex gap-2 flex-wrap">
              <div
                class="cats category-btn px-4 py-2 rounded-full cat-purple inline mb-1"
              >
                Science
              </div>
            </div>
            <div class="extraits_item_text my-3">
              <p>Ceci est un texte de l'extrait</p>
            </div>
            <div class="btns mt-4">
              <div class="flex items-center justify-between">
                <div class="extraits_view underline font-semibold">
                  Voir l'extrait
                </div>
                <div
                  class="btn_add_extrait extrait_btn px-3 py-2 rounded text-white"
                  @click="addExcerptBlock"
                >
                  <button>Ajouter l'extrait</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-8/12 relative">
        <div class="promenade_title font-semibold text-lg mb-8">
          <h2>Titre de la promenade<sup>*</sup></h2>
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
        <div class="promenade_image font-semibold text-lg mb-8">
          <h2>Ajouter la photo mise en avant<sup>*</sup></h2>
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
              class="flex justify-between py-5 items-start"
            >
              <div class="my-2 w-full">
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
            </div>

            <!-- Transition input -->
            <div
              v-else-if="item.type === 'transition'"
              class="flex justify-between py-5 mb-10 items-start"
            >
              <div class="w-full h-[300px] mr-5 cursor-move wisiwig">
                <!--                 <WysiwygEditor
                  v-model="item.content"
                  @update:value="(content) => (item.content = content)"
                /> -->
                <WysiwygEditor
                  @update:value="(content) => (item.content = content)"
                />
              </div>
              <button @click="removeItem(index)">
                <img
                  src="@/assets/images/icons/corbeille.svg"
                  alt=""
                  class="w-[15px]"
                />
              </button>
            </div>

            <!-- Excerpt block -->
            <div
              v-else-if="item.type === 'excerpt'"
              class="flex justify-between py-5 items-start"
            >
              <div class="bg-white rounded-md p-5 w-full mr-5 cursor-move">
                <div>{{ item.content }}</div>
              </div>
              <button @click="removeItem(index)">
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
    :content="items"
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
.promenade_btn_image.disabled {
  background-color: rgb(209 213 219);
}
.promenade_btn_transition,
.extrait_btn {
  background-color: var(--purple-color);
}
</style>
