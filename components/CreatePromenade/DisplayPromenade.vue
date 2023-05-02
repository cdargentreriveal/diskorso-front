<script lang="ts" setup>
import Sortable from 'sortablejs'
import { usePromenadeStore } from '~~/store/promenade'
const PromenadeStore = usePromenadeStore()

function removeItem(index: number, id: number): void {
  const type = PromenadeStore.items[index].type
  if (type === 'excerpt') {
    PromenadeStore.removeExtractid(id)
  }
  PromenadeStore.decrementCount(type)
  PromenadeStore.items.splice(index, 1)
}

function handleImageUpload(event: Event, index: number): void {
  const file = (event.target as HTMLInputElement).files?.[0]

  if (!file) return
  const formData = new FormData()
  formData.append('file', file)
  PromenadeStore.items[index].imagetoUpload = formData
  const reader = new FileReader()
  reader.onload = () => {
    const image = new Image()
    image.onload = () => {
      PromenadeStore.items[index].imageUrl = reader.result as string
    }
    image.src = reader.result as string
  }
  reader.readAsDataURL(file)
}
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
        const updatedItems = [...PromenadeStore.items] // créer une copie du tableau
        const [removed] = updatedItems.splice(oldIndex, 1) // supprimer l'élément à l'ancienne position
        updatedItems.splice(newIndex, 0, removed) // insérer l'élément à la nouvelle position
        PromenadeStore.items = updatedItems // mettre à jour le tableau d'origine
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
  <div ref="blocTransition" class="promenadeContainer">
    <div
      v-for="(item, index) in PromenadeStore.items"
      :key="item.key"
      class="bloc"
    >
      <!-- Image input -->
      <div
        v-if="item.type === 'image'"
        class="flex justify-between py-6 items-stretch"
      >
        <div class="w-full border border-slate-300 p-8 min-h-min">
          <label for="avatar-upload text-sm translate-y-full block">
            <input
              id="avatar-upload"
              ref="fileInput"
              type="file"
              accept="image/*"
              class="text-sm avatar-upload"
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
            <img src="@/assets/images/icons/drag.svg" alt="" class="w-[15px]" />
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
            <img src="@/assets/images/icons/drag.svg" alt="" class="w-[15px]" />
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
            <img src="@/assets/images/icons/drag.svg" alt="" class="w-[15px]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.bloc-drag {
  height: calc(100% - 87px);
}
.avatar-upload {
  transform: translateY(100%);
}
</style>
