<script lang="ts" setup>
import { BtnAdminPage } from '@/types/AdminTitlePage'
const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'link',
    titleBlack: 'Mon',
    titlePurple: 'compte',
    actionBtn: [{ action: 'Supprimer' }],
    route: { name: 'creer-une-promenade' },
  },
])
definePageMeta({
  layout: 'userconnected',
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
      v-if="datasTitle[0].type === 'link'"
      :title-black="datasTitle[0].titleBlack"
      :title-purple="datasTitle[0].titlePurple"
      :action-btn="datasTitle[0].actionBtn"
      :route="datasTitle[0].route.name"
    />
    <div class="container_promenade w-9/12 mx-auto flex gap-8">
      <div class="w-4/12 bg-white p-6 rounded">
        <form class="form">
          <div class="form-user py-4">
            <label>Username :</label>
            <input
              type="text"
              class="ml-2 pb-1 border-b-1 border-slate-300 text-slate-400 text-sm focus:outline-none"
              placeholder="Votre Username"
            />
          </div>
          <div class="form-user py-4">
            <label>Email :</label>
            <input
              type="mail"
              class="ml-2 pb-1 border-b-1 border-slate-300 text-slate-400 text-sm focus:outline-none"
              placeholder="Votre email"
            />
          </div>
        </form>
      </div>
      <div class="w-4/12">fdfddf</div>
      <div class="w-4/12">fdfddf</div>
    </div>
  </div>
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
