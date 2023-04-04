<script lang="ts" setup>
import { BtnAdminPage } from '@/types/AdminTitlePage'
import WysiwygEditor from '~/components/WYSIWYG/WysiwygEditor.vue'
definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})
const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'link',
    titleBlack: 'Suivre',
    titlePurple: 'le tutoriel',
    actionBtn: [{ action: 'Créer une promenade' }],
    route: { name: 'creer-une-promenade' },
  },
])
</script>

<template>
  <AdminMenu />
  <div class="container mx-auto">
    <AdminTitle
      v-if="datasTitle[0].type === 'link'"
      :title-black="datasTitle[0].titleBlack"
      :title-purple="datasTitle[0].titlePurple"
      :action-btn="datasTitle[0].actionBtn"
      :route="datasTitle[0].route.name"
    />
    <div class="container_promenade w-9/12 mx-auto mb-10">
      <img
        src="@/assets/images/tutoriel-diskorso.png"
        alt="tutoriel diskorso"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
sup {
  color: #f55a78;
}
</style>
