<script lang="ts" setup>
import { BtnAdminPage } from '@/types/AdminTitlePage'
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
      if (fileInput.value) {
        fileInput.value.style.display = 'none'
      }
    }
    image.src = reader.result as string
  }
  reader.readAsDataURL(file)
}

function deletePicturesBanner() {
  avatarUrl.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
    fileInput.value.style.display = 'inherit'
  }
}

// Calculer si une photo est sélectionnée
const hasAvatar = computed(() => !!avatarUrl.value)
definePageMeta({
  layout: 'page',
})
onMounted(() => {
  const body = document.querySelector('body')
  if (body) {
    body.style.backgroundColor = '#F8F8F8'
  }
})
onBeforeUnmount(() => {
  const body = document.querySelector('body')
  if (body) {
    body.style.backgroundColor = ''
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
              <p>fkdjkdfjdfjkdfj</p>
            </div>
            <div class="btns mt-4">
              <div class="flex items-center justify-between">
                <div class="extraits_view underline font-semibold">
                  Voir l'extrait
                </div>
                <div
                  class="btn_add_extrait extrait_btn px-3 py-2 rounded text-white"
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
              type="text"
              name="scales"
              class="my-2 p-2 text-sm border border-slate-300 rounded w-full h-[40px]"
            />
          </div>
        </div>
        <div class="promenade_image font-semibold text-lg mb-8">
          <h2>Ajouter la photo mise en avant<sup>*</sup></h2>
          <div class="my-2">
            <label for="avatar-upload text-sm">
              <input
                id="avatar-upload"
                ref="fileInput"
                type="file"
                accept="image/*"
                class="text-sm"
                @change="handleFileUpload"
              />
              <div
                v-if="hasAvatar"
                class="banner h-[300px] w-full overflow-hidden flex items-start my-2 p-2"
              >
                <img
                  :src="avatarUrl"
                  type="file"
                  name="files"
                  class="object-cover h-full w-full rounded-lg"
                  alt=""
                />
                <div class="delete ml-2 w-[15px]" @click="deletePicturesBanner">
                  <img
                    src="@/assets/images/icons/corbeille.svg"
                    alt=""
                    class="w-full"
                  />
                </div>
              </div>
            </label>
          </div>
        </div>
        <div class="promenade_description font-semibold text-lg mb-8">
          <div class="flex items-center justify-between">
            <h2>Ajouter une description<sup>*</sup></h2>
            <div class="max_words font-normal text-xs italic">110 mots max</div>
          </div>
          <textarea
            type="text"
            name="scales"
            class="my-2 p-2 text-sm border border-slate-300 rounded w-full"
          />
        </div>

        <!-- bloc encart vide pour stipuler qu'il faut ajouter un élément -->
        <div class="promenade_bloc_empty text-center mb-[120px]">
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
              >
                <button>Ajouter une image</button>
              </div>
              <div
                class="promenade_btn_transition px-4 py-3 text-sm rounded text-white"
              >
                <button>Ajouter une transition</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AdminMenuSideBar />
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

.promenade_btn_transition,
.extrait_btn {
  background-color: var(--purple-color);
}
</style>
