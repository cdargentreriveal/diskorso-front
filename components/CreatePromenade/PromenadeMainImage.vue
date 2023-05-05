<script lang="ts" setup>
import { usePromenadeStore } from '~~/store/promenade'
const { $swal } = useNuxtApp()

const displaySwal = (
  title: string,
  text: string,
  icon: string,
  confirmButtonText: string,
  showCancelButton?: boolean
) => {
  $swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    showCancelButton,
  })
}
const PromnadeStore = usePromenadeStore()
const fileInput = ref<HTMLInputElement>()

// Calculer si une photo est sélectionnée
const hasAvatar = computed(() => !!PromnadeStore.mainImage)
const localSourceInput = ref(PromnadeStore.mainImageSource)

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const maxSize = 500 * 1024
  if (file.size > maxSize) {
    displaySwal(
      "Taille de l'image trop grande",
      `La taille de l'image ne peut dépasser 500 ko`,
      'error',
      'Ok'
    )
    return
  }
  const allowedExtensions = ['png', 'svg', 'jpeg', 'jpg', 'webp']
  const fileNameParts = file.name.split('.')
  const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase()
  if (!allowedExtensions.includes(fileExtension)) {
    displaySwal(
      'Format non autorisé',
      `Les formats autorisés sont jpeg, png, webp et svg `,
      'error',
      'Ok'
    )
    return
  }

  const formData = new FormData()
  formData.append('file', file)
  PromnadeStore.mainImageToUpload = formData
  const reader = new FileReader()
  reader.onload = () => {
    const image = new Image()
    image.onload = () => {
      PromnadeStore.mainImage = reader.result as string
    }
    image.src = reader.result as string
  }
  reader.readAsDataURL(file)
}
function deletePicturesBanner() {
  PromnadeStore.mainImage = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  PromnadeStore.setMainImageSource(value)
  localSourceInput.value = value
}
</script>

<template>
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
        <div v-if="hasAvatar" class="banner h-[300px] w-full overflow-hidden">
          <div class="flex h-full w-full items-start p-2">
            <img
              :src="PromnadeStore.mainImage"
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
        <div v-if="hasAvatar" class="source py-2 w-full flex items-center">
          <label class="text-sm pr-5">Source : <sup>*</sup></label
          ><input
            class="p-3 border-b-1 border-slate-300 text-xs focus:outline-none w-6/12 bg-transparent text-slate-400"
            type="text"
            placeholder="Le nom de la source"
            :value="localSourceInput"
            @input="onInput"
          />
        </div>
      </label>
    </div>
  </div>
</template>
