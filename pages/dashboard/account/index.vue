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
    <div class="container_promenade w-9/12 mx-auto">
      <div class="flex gap-8">
        <div class="w-4/12 bg-white p-6 rounded-md">
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
            <div
              class="saved_btn w-8/12 my-5 text-center px-4 py-3 text-sm rounded-md text-white"
            >
              <button class="font-semibold">Enregistrer</button>
            </div>
          </form>
        </div>
        <div class="w-4/12 bg-white p-6 rounded-md">
          <form class="form">
            <div class="form-user py-4">
              <label>Changer mon mot de passe</label>
              <input
                type="password"
                class="my-5 pb-1 border-b-1 border-slate-300 text-slate-400 text-sm focus:outline-none"
                placeholder="Votre mot de passe"
              />
            </div>
            <div
              class="saved_btn w-8/12 my-5 text-center px-4 py-3 text-sm rounded-md text-white"
            >
              <button class="font-semibold">Changer</button>
            </div>
          </form>
        </div>
      </div>
      <div class="statitiques bg-white my-5 p-6 rounded-md">
        <div class="header flex items-center justify-between">
          <div class="header-title flex items-center">
            <span class="w-[40px] mr-2"
              ><img src="@/assets/images/icons/rocket.svg" alt="icone rocket"
            /></span>
            <h2 class="font-semibold text-xl">Mes statitiques</h2>
          </div>
          <div class="created_at">
            <p>Inscrit depuis le 12/02/2023</p>
          </div>
        </div>
      </div>
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
