<script lang="ts" setup>
import WysywygEditorWithoutToolBar from '../../../components/WYSIWYG/WysywygEditorWithoutToolBar.vue'
import { BtnAdminPage } from '@/types/AdminTitlePage'
import { useExtractStore } from '~~/store/extracts'

const extractsStore = useExtractStore()

definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})
const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'button',
    titleBlack: 'Modifier cet',
    titlePurple: 'extrait',
    actionBtn: [{ action: 'Voir tutoriel' }],
    route: { name: 'dashboard/tutoriel' },
  },
])
// const nameInput = ref('')
// const sourceInput = ref('')
// const contentInput = ref('')
const wysiwygEditorRef = ref<typeof WysywygEditorWithoutToolBar | null>(null)
const localNameInput = ref(extractsStore.extractSelected?.name)
const localSourceInput = ref(extractsStore.extractSelected?.source)

// const clearData = (): void => {
//   nameInput.value = ''
//   sourceInput.value = ''
//   contentInput.value = ''
//   wysiwygEditorRef.value?.clearEditor()
//   refreshNuxtData()
// }

const onInputName = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  extractsStore.setEditNameExtract(value)
  localNameInput.value = value
}

const onInputSource = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  extractsStore.setEditSourceExtract(value)
  localSourceInput.value = value
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
      :route="datasTitle[0].route.name"
    />
    <div class="container_promenade w-9/12 mx-auto">
      <div class="flex items-center gap-20 mb-10">
        <div class="extrait-name w-6/12">
          <label class="font-semibold"
            >Modifier le nom de l'extrait <sup>*</sup>
            <div class="my-2">
              <input
                :value="extractsStore.extractSelected?.name"
                type="text"
                name="scales"
                class="my-2 p-2 text-sm border border-slate-300 rounded w-full h-[40px]"
                maxlength="60"
                @input="onInputName"
              />
            </div>
          </label>
        </div>
        <div class="extrait-source w-6/12">
          <label class="font-semibold"
            >Modifier la source de l'extrait <sup>*</sup>
            <div class="my-2">
              <input
                :value="extractsStore.extractSelected?.source"
                type="text"
                name="scales"
                class="my-2 p-2 text-sm border border-slate-300 rounded w-full h-[40px]"
                @input="onInputSource"
              />
            </div>
          </label>
        </div>
      </div>
      <div class="extrait-content">
        <div class="font-semibold mb-4">Modifier l'extrait<sup>*</sup></div>
        <div class="my-2 w-full h-[30vh] max-h-[30vh]">
          <WYSIWYGWysywygEditorWithoutToolBarEdit
            class="h-full bg-white"
            :content="extractsStore.extractSelected?.content"
            @update:value="(value: any) => (extractsStore.extractSelected!.content= value)"
          />
        </div>
      </div>
    </div>
    <EditExtractMenuSideBar />
  </div>
</template>
<style scoped lang="scss">
sup {
  color: #f55a78;
}
</style>
