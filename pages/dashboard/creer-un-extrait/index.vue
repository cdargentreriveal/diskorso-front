<script lang="ts" setup>
import WysywygEditorWithoutToolBar from '../../../components/WYSIWYG/WysywygEditorWithoutToolBar.vue'
import { BtnAdminPage } from '@/types/AdminTitlePage'

definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})
const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'button',
    titleBlack: 'Créer un',
    titlePurple: 'extrait',
    actionBtn: [{ action: 'Voir tutoriel' }],
    route: { name: 'dashboard/tutoriel' },
  },
])
const nameInput = ref('')
const sourceInput = ref('')
const contentInput = ref('')
const wysiwygEditorRef = ref<typeof WysywygEditorWithoutToolBar | null>(null)

const clearData = (): void => {
  nameInput.value = ''
  sourceInput.value = ''
  contentInput.value = ''
  wysiwygEditorRef.value?.clearEditor()
  refreshNuxtData()
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
            >Nom de l'extrait <sup>*</sup>
            <div class="my-2">
              <input
                v-model="nameInput"
                type="text"
                name="scales"
                class="my-2 p-2 text-sm border border-slate-300 rounded w-full h-[40px]"
                maxlength="60"
              />
            </div>
          </label>
        </div>
        <div class="extrait-source w-6/12">
          <label class="font-semibold"
            >Source de l'extrait <sup>*</sup>
            <div class="my-2">
              <input
                v-model="sourceInput"
                type="text"
                name="scales"
                class="my-2 p-2 text-sm border border-slate-300 rounded w-full h-[40px]"
              />
            </div>
          </label>
        </div>
      </div>
      <div class="extrait-content">
        <div class="font-semibold mb-4">Collez votre contenu <sup>*</sup></div>
        <div class="my-2 w-full h-[30vh] max-h-[30vh]">
          <WYSIWYGWysywygEditorWithoutToolBar
            ref="wysiwygEditorRef"
            v-model="contentInput"
            class="h-full bg-white"
            @update:value="(content:any) => (contentInput = content)"
          />
        </div>
      </div>
    </div>
    <AdminMenuSideBarCreateExtract
      :name="nameInput"
      :source="sourceInput"
      :content="contentInput"
      :clear-data="clearData"
    />
  </div>
</template>
<style scoped lang="scss">
sup {
  color: #f55a78;
}
</style>
