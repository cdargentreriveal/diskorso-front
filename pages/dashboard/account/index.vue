<script lang="ts" setup>
import { useUserStore } from '~~/store/user'
import { BtnAdminPage } from '@/types/AdminTitlePage'
import avatarImage from '@/assets/images/test-avatar.jpg'
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
  layout: 'admin',
})
const editModeUsername = ref(true)
function onEditUsernameClick() {
  /*   if (editModeUsername.value) {
    editModeUsername.value = true
  } else {
    editModeUsername.value = false
  } */
  editModeUsername.value = !editModeUsername.value
}
const editModeEmail = ref(true)
function onEditEmailClick() {
  /*   if (editModeEmail.value) {
    editModeEmail.value = true
  } else {
    editModeEmail.value = false
  } */
  editModeEmail.value = !editModeEmail.value
}

const AvatarUrl = ref<string>(avatarImage)

// Définissez le type de l'argument event comme de type Event
function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    const image = new Image()
    image.onload = () => {
      AvatarUrl.value = reader.result as string
    }
    image.src = reader.result as string
  }
  reader.readAsDataURL(file)
}
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
            <div class="form-user pb-2 flex items-center relative">
              <div
                class="avatar mx-auto w-[140px] h-[140px] rounded-full overflow-hidden"
              >
                <label for="avatar-upload">
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    style="display: none"
                    @change="handleFileUpload"
                  />
                  <img :src="AvatarUrl" alt="" />
                </label>
              </div>
              <div
                v-if="AvatarUrl !== avatarImage"
                class="saved_btn w-[25px] h-[25px] mx-auto text-center p-[6px] flex items-center text-xs rounded-md text-white absolute bottom-0 right-0"
              >
                <button>
                  <img
                    src="@/assets/images/icons/save.svg"
                    alt="icone enregistrer"
                  />
                </button>
              </div>
              <div
                v-else
                class="edit_btn w-[25px] h-[25px] mx-auto text-center p-[6px] text-xs rounded-md text-white absolute bottom-0 right-0"
              >
                <label for="avatar-upload">
                  <input
                    id="avatar-upload-edit"
                    type="file"
                    accept="image/*"
                    style="display: none"
                    @change="handleFileUpload"
                  />
                  <img
                    src="@/assets/images/icons/edit.svg"
                    alt="icone enregistrer"
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
        <div class="w-5/12 bg-white p-6 rounded-md">
          <form class="form flex items-end gap-10">
            <div class="form-user py-4 w-7/12">
              <label class="w-2/12">Username :</label>
              <input
                ref="usernameInput"
                class="py-3 border-b-1 block border-slate-300 text-sm focus:outline-none w-full disabled:bg-white"
                :class="editModeUsername ? 'text-slate-400' : 'text-black '"
                :value="user.currentUser?.username"
                type="text"
                :disabled="editModeUsername"
                placeholder="Votre username"
              />
            </div>
            <div
              class="w-4/12 my-5 text-center px-4 py-3 text-xs rounded-md"
              :class="
                editModeUsername
                  ? 'text-black border-black border-1'
                  : 'saved_btn  text-white'
              "
            >
              <button
                class="font-semibold"
                @click.prevent="onEditUsernameClick"
              >
                {{ editModeUsername ? 'Modifier' : 'Enregistrer' }}
              </button>
            </div>
          </form>
        </div>
        <div class="w-5/12 bg-white p-6 rounded-md">
          <form class="form flex items-end gap-10">
            <div class="form-user py-4 w-7/12">
              <label class="w-2/12">Email :</label>
              <input
                ref="usernameInput"
                class="py-3 border-b-1 block border-slate-300 text-sm focus:outline-none w-full disabled:bg-white"
                :class="editModeEmail ? 'text-slate-400' : 'text-black '"
                :value="user.currentUser?.email"
                type="text"
                :disabled="editModeEmail"
                placeholder="Votre email"
              />
            </div>
            <div
              class="w-4/12 my-5 text-center px-4 py-3 text-xs rounded-md"
              :class="
                editModeEmail
                  ? 'text-black border-black border-1'
                  : 'saved_btn  text-white'
              "
            >
              <button class="font-semibold" @click.prevent="onEditEmailClick">
                {{ editModeEmail ? 'Modifier' : 'Enregistrer' }}
              </button>
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
.avatar img {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
.edit_btn,
.edit_btn img {
  cursor: pointer;
  background-color: #69b8d9;
}
</style>
