<script lang="ts" setup>
import { useUserStore } from '~~/store/user'
import { BtnAdminPage } from '@/types/AdminTitlePage'
const user = useUserStore()
const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'link',
    titleBlack: 'Mon',
    titlePurple: 'compte',
    actionBtn: [{ action: 'Supprimer' }],
    route: { name: '' },
  },
])

definePageMeta({
  layout: 'page',
})
const editMode = ref(true)
function onEditClick() {
  /*   if (editMode.value) {
    editMode.value = true
  } else {
    editMode.value = false
  } */
  editMode.value = !editMode.value
}

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
      <div class="flex gap-6 justify-between items-center">
        <div class="w-2/12 rounded-md">
          <form class="form">
            <div class="form-user pb-2 flex">
              <div class="avatar mx-auto w-8/12 rounded-full overflow-hidden">
                <img src="@/assets/images/test-avatar.jpg" alt="" />
              </div>
            </div>
            <!--             <div
              class="saved_btn w-8/12 mx-auto mt-2 text-center px-4 py-3 text-xs rounded-md text-white"
            >
              <button class="font-semibold">Enregistrer</button>
            </div> -->
          </form>
        </div>
        <div class="w-5/12 bg-white p-6 rounded-md">
          <form class="form flex items-end gap-10">
            <div class="form-user py-4 w-7/12">
              <label class="w-2/12">Username :</label>
              <input
                id="my-input"
                ref="usernameInput"
                class="py-3 border-b-1 block border-slate-300 text-sm focus:outline-none w-full disabled:bg-white"
                :class="editMode ? 'text-slate-400' : 'text-black '"
                :value="user.currentUser?.username"
                type="text"
                :disabled="editMode"
                placeholder="Votre username"
              />
            </div>
            <div
              class="w-4/12 my-5 text-center px-4 py-3 text-xs rounded-md"
              :class="
                editMode
                  ? 'text-black border-black border-1'
                  : 'saved_btn  text-white'
              "
            >
              <button class="font-semibold" @click.prevent="onEditClick">
                {{ editMode ? 'Modifier' : 'Enregistrer' }}
              </button>
            </div>
          </form>
        </div>
        <div class="w-5/12 bg-white p-6 rounded-md">
          <form class="form flex items-end gap-10">
            <div class="form-user py-4 w-7/12">
              <label class="w-2/12">Email :</label>
              <input
                type="mail"
                class="py-3 border-b-1 block border-slate-300 text-slate-400 text-sm focus:outline-none w-full"
                :value="user.currentUser?.email"
                placeholder="Votre email"
              />
            </div>
            <div
              class="w-4/12 my-5 text-center px-4 py-3 text-xs rounded-md text-black border-black border-1"
            >
              <button class="font-semibold">Modifier</button>
            </div>
          </form>
        </div>
      </div>
      <div
        class="statitiques bg-white my-5 p-6 rounded-md divide-y divide-slate-300"
      >
        <div class="header flex items-center justify-between pt-3 py-6">
          <div class="header-title flex items-center">
            <span class="w-[40px] mr-2"
              ><img src="@/assets/images/icons/rocket.svg" alt="icone rocket"
            /></span>
            <h2 class="font-semibold text-xl">Mes statistiques</h2>
          </div>
          <div class="created_at text-sm">
            <p>
              Inscrit(e) depuis le :
              <span class="purple-color">12/02/2023</span>
            </p>
          </div>
        </div>
        <div class="flex items-center divide-x divide-slate-300">
          <div class="w-3/12 text-center py-6">
            <div class="promenades-number text-2xl purple-color font-bold">
              14
            </div>
            <div class="promenades-published">Promenades créées</div>
          </div>
          <div class="w-3/12 text-center py-6">
            <div class="promenades-number text-2xl purple-color font-bold">
              8
            </div>
            <div class="promenades-archived">Promenades archivées</div>
          </div>
          <div class="w-3/12 text-center py-6">
            <div class="promenades-number text-2xl purple-color font-bold">
              225
            </div>
            <div class="extraits-used">Extraits utilisés</div>
          </div>
          <div class="w-3/12 text-center py-6">
            <div class="promenades-number text-2xl purple-color font-bold">
              53
            </div>
            <div class="extraits-archived">Extraits archivés</div>
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
