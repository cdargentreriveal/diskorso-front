<script lang="ts" setup>
import { BtnAdminPage } from '@/types/AdminTitlePage'
import WysiwygEditor from '~/components/WYSIWYG/WysiwygEditor.vue'
definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})
const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'button',
    titleBlack: 'Créer un',
    titlePurple: 'extrait',
    actionBtn: [{ action: 'Publier' }, { action: 'Archiver' }],
  },
])
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
    <div class="container_promenade w-9/12 mx-auto">
      <div class="flex items-center gap-20 mb-10">
        <div class="extrait-name w-6/12">
          <label class="font-semibold"
            >Nom de l'extrait <sup>*</sup>
            <div class="my-2">
              <input
                type="text"
                name="scales"
                class="my-2 p-2 text-sm border border-slate-300 rounded w-full h-[40px]"
                maxlength="40"
              />
            </div>
          </label>
        </div>
        <div class="extrait-source w-6/12">
          <label class="font-semibold"
            >Source de l'extrait <sup>*</sup>
            <div class="my-2">
              <input
                type="text"
                name="scales"
                class="my-2 p-2 text-sm border border-slate-300 rounded w-full h-[40px]"
                maxlength="40"
              />
            </div>
          </label>
        </div>
      </div>
      <div class="extrait-content">
        <div class="font-semibold mb-4">Collez votre contenu <sup>*</sup></div>
        <div class="my-2 w-full h-[30vh] max-h-[30vh]">
          <WysiwygEditor
            ref="quillEditor"
            class="h-full bg-white"
            :modules="{ toolbar: false }"
            @update:value="(content) => (item.content = content)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
sup {
  color: #f55a78;
}
</style>
