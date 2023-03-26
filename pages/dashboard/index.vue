<script lang="ts" setup>
import { useUserStore } from '~~/store/user'
import { BtnAdminPage } from '@/types/AdminTitlePage'
const user = useUserStore()
const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'link',
    titleBlack: 'Mes',
    titlePurple: 'promenades',
    actionBtn: [{ action: 'Créer une promenade' }],
    route: { name: 'dashboard/creer-une-promenade' },
  },
])

definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})
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
    <div class="w-9/12 mx-auto flex items-center">
      <div
        v-for="(promenades, index) in user.currentUser.promenades"
        :key="index"
        class="w-4/12"
      >
        <AdminCardTemplate :promenade="promenades" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.action-button {
  background-color: var(--purple-color);
}
</style>
