<script lang="ts" setup>
import { useUserStore } from '~~/store/user'
import { BtnAdminPage } from '@/types/AdminTitlePage'
import {
  modifyAvatar,
  modifyEmail,
  modifyUsername,
  refreshToken,
} from '~~/utils/connected'
import { User } from '~~/types/User'

definePageMeta({ layout: 'admin', middleware: ['is-logged'] })
const config = useRuntimeConfig()
const user = useUserStore()

let xsrfToken: any = null
let xsrfTokenTime: any = null
if (process.client) {
  xsrfToken = localStorage.getItem('xsrfToken')
  xsrfTokenTime = localStorage.getItem('xsrfToken_time')
}

interface UserFetched {
  data: User
  message: string
  success: boolean
}

const {
  data: response,
  error,
  execute,
  refresh,
} = await useAsyncData<UserFetched | null>(
  'response',
  async () =>
    await $fetch(`${config.public.baseURL}/users/user-connected`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${xsrfToken}`,
      },
      credentials: 'include',
    })
)

if (response && response.value && response.value.success) {
  user.setUser(response.value.data)
}

if (error.value) {
  refreshToken(config.public.baseURL)
    .then(async () => {
      await execute()
      if (response?.value?.data) {
        user.setUser(response.value.data)
      }
    })
    .catch((error) => {
      return error
    })
}

const currentUsername = ref<string>(user.currentUser?.username ?? '')
const displayedUsername = ref<string>(user.currentUser?.username ?? '')
const currentEmail = ref<string>(user.currentUser?.email ?? '')
const displayedEmail = ref<string>(user.currentUser?.email ?? '')
const AvatarUrl = ref<string>(
  user.currentUser && user.currentUser.picture ? user.currentUser.picture : ''
)
const editModeUsername = ref(true)
const editModeEmail = ref(true)
const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'link',
    titleBlack: 'Mon',
    titlePurple: 'compte',
    actionBtn: [{ action: 'Supprimer' }],
    route: { name: '' },
  },
])
const { $swal } = useNuxtApp()
const displaySwal = (
  title: string,
  text: string,
  icon: string,
  confirmButtonText: string
) => {
  $swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
  })
}
// const changeAvatarhover = document.querySelector('.change-avatar')
const showChangeAvatar = (event: any) => {
  const changeAvatarHover = event.currentTarget
  changeAvatarHover?.classList.replace('opacity-0', 'opacity-100')
}

const hideChangeAvatar = (event: any) => {
  const changeAvatarHover = event.currentTarget
  changeAvatarHover?.classList.replace('opacity-100', 'opacity-0')
}
const mounted = () => {
  // Initialise la valeur affichée dans l'input
  displayedUsername.value = currentUsername.value
  displayedEmail.value = currentEmail.value
}
onMounted(mounted)

const onUsernameInput = (event: Event) => {
  displayedUsername.value = (event.target as HTMLInputElement).value
}

const onEmailInput = (event: Event) => {
  displayedEmail.value = (event.target as HTMLInputElement).value
}

async function onEditUsernameClick() {
  if (editModeUsername.value) {
    editModeUsername.value = false
  } else {
    try {
      const response = await modifyUsername(
        config.public.baseURL,
        displayedUsername.value
      )
      if (!response.success) {
        displaySwal(
          'Echec',
          'Le pseudo que vous avez saisi est déjà associé à un compte utilisateur. Veuillez utiliser un pseudo différent.',
          'error',
          'ok'
        )
      } else {
        displaySwal(
          'Modification réussie',
          `Votre nouveau username est ${displayedUsername.value}`,
          'success',
          'Ok'
        )
        editModeUsername.value = true
      }
    } catch (error) {
      displaySwal(
        'Erreur lors de la modification',
        'Une erreur est survenue lors de la modification de votre username. Veuillez réessayer plus tard.',
        'error',
        'Ok'
      )
    }
  }
}

async function onEditEmailClick() {
  if (editModeEmail.value) {
    editModeEmail.value = false
  } else {
    try {
      const response = await modifyEmail(
        config.public.baseURL,
        displayedEmail.value
      )
      if (!response.success) {
        displaySwal('Echec', `${response.data.message}`, 'error', 'ok')
      } else {
        displaySwal(
          'Modification réussie !',
          `${response.data.message}`,
          'success',
          'ok'
        )
        editModeEmail.value = true
      }
    } catch (error) {
      displaySwal(
        'Erreur lors de la modification',
        'Une erreur est survenue lors de la modification de votre email. Veuillez réessayer plus tard.',
        'error',
        'Ok'
      )
    }
  }
}

// Définissez le type de l'argument event comme de type Event
function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const maxSize = 500 * 1024
  if (file.size > maxSize) {
    displaySwal(
      "Taille de l'image trop grande",
      `La taille de l'image ne peut dépasser 500 ko`,
      'error',
      'Ok'
    )
    return
  }
  const allowedExtensions = ['png', 'svg', 'jpeg', 'jpg', 'webp']
  const fileNameParts = file.name.split('.')
  const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase()
  if (!allowedExtensions.includes(fileExtension)) {
    displaySwal(
      'Format non autorisé',
      `Les formats autorisés sont jpeg, png, webp et svg `,
      'error',
      'Ok'
    )
    return
  }
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

async function changeAvatar(event: Event) {
  event.preventDefault()
  try {
    if (process.client) {
      const file = (
        document.getElementById('avatar-upload') as HTMLInputElement
      ).files?.[0]
      if (!file) return

      const formData = new FormData()
      formData.append('file', file)
      const response = await modifyAvatar(config.public.baseURL, formData)
      if (!response.success) {
        displaySwal('Echec', `${response.data.message}`, 'error', 'ok')
      } else {
        displaySwal(
          'Modification réussie !',
          'Votre image de profile a bien été mise à jour',
          'success',
          'ok'
        )
      }
      AvatarUrl.value = user.currentUser!.picture
    }
  } catch (error) {
    return error
  }
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
    <div class="container_promenade w-9/12 mx-auto mt-15">
      <div class="flex gap-6 justify-between items-center">
        <div class="w-2/12 rounded-md">
          <form v-if="user.currentUser" class="form">
            <div class="form-user pb-2 flex items-center relative">
              <div
                class="avatar mx-auto w-[140px] h-[140px] rounded-full overflow-hidden relative"
              >
                <div
                  class="opacity-0 change-avatar absolute h-full w-full z-10 bg-gray-800/75 cursor-pointer"
                  @mouseover="showChangeAvatar"
                  @mouseleave="hideChangeAvatar"
                >
                  <label for="avatar-upload" class="cursor-pointer">
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      style="display: none"
                      @change="handleFileUpload"
                    />
                    <div
                      class="absolute top-1/2 left-1/2 change-pic text-white w-1/2"
                    >
                      Changer la photo
                    </div>
                  </label>
                </div>
                <label for="avatar-upload">
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    style="display: none"
                    @change="handleFileUpload"
                  />
                  <img
                    v-if="AvatarUrl && AvatarUrl !== ''"
                    :src="AvatarUrl"
                    alt="photo de profil"
                  />
                  <img
                    v-else
                    src="@/assets/images/avatar-dk.jpg"
                    alt="photo de profil"
                  />
                </label>
              </div>
              <div
                v-if="AvatarUrl !== user.currentUser!.picture && AvatarUrl!==''"
                class="saved_btn w-[25px] h-[25px] mx-auto text-center p-[6px] flex items-center text-xs rounded-md text-white absolute bottom-0 right-0"
              >
                <button @click="changeAvatar($event)">
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
                    alt="icone modifier photo"
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
                @input="onUsernameInput"
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
                ref="emailInput"
                class="py-3 border-b-1 block border-slate-300 text-sm focus:outline-none w-full disabled:bg-white"
                :class="editModeEmail ? 'text-slate-400' : 'text-black '"
                :value="user.currentUser?.email"
                type="text"
                :disabled="editModeEmail"
                placeholder="Votre email"
                @input="onEmailInput"
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
        class="statitiques bg-white my-8 p-6 rounded-md divide-y divide-slate-300"
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
              <span v-if="user.currentUser?.createdAt" class="purple-color">{{
                getDate(user.currentUser?.createdAt)
              }}</span>
            </p>
          </div>
        </div>
        <div class="flex items-center divide-x divide-slate-300">
          <div class="w-3/12 text-center py-6">
            <div class="promenades-number text-2xl purple-color font-bold">
              {{ user.currentUser?.publishedPromenadesCount }}
            </div>
            <div class="promenades-published">Promenades créées</div>
          </div>
          <div class="w-3/12 text-center py-6">
            <div class="promenades-number text-2xl purple-color font-bold">
              {{ user.currentUser?.unpublishedPromenadesCount }}
            </div>
            <div class="promenades-archived">Promenades en brouillon</div>
          </div>
          <NuxtLink
            to="/dashboard/mes-extraits"
            class="w-3/12 text-center py-6"
          >
            <div class="promenades-number text-2xl purple-color font-bold">
              {{ user.currentUser?.totalExtracts }}
            </div>
            <div class="extraits-used">Total extraits stockés</div>
          </NuxtLink>
          <div class="w-3/12 text-center py-6">
            <div class="promenades-number text-2xl purple-color font-bold">
              {{ user.currentUser?.usedExtractsCount }}
            </div>
            <div class="extraits-archived">Extraits utilisés</div>
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
    opacity: 0.7;
  }
}
.edit_btn,
.edit_btn img {
  cursor: pointer;
  background-color: #69b8d9;
}
.bg-blue {
  background-color: #69b8d9;
}
.change-pic {
  transform: translate(-50%, -50%);
}
.change-avatar {
  transition: 0.25s ease-in-out;
}
</style>
