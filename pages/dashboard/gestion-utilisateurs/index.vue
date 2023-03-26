<script lang="ts" setup>
import { BtnAdminPage } from '@/types/AdminTitlePage'
import { useUserStore } from '~~/store/user'
const config = useRuntimeConfig()
const userStore = useUserStore()
const listUser = userStore.listUser
const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'button',
    titleBlack: 'Gérer les',
    titlePurple: 'utilisateurs',
    data: [{ number: 3 }, { value: 'utilisateurs inscrits' }],
    actionBtn: [
      { action: 'Actif' },
      { action: 'Bannir' },
      { action: 'Supprimer' },
    ],
  },
])

const xsrfToken = localStorage.getItem('xsrfToken')
const selectedOption = ref('Selectionner')
const masterCheckbox = ref(false)

const allusers = ref()

type User = {
  id: number
  createdAt: string
  username: string
  email: string
  role: string
  validate_email: boolean
  blocked: boolean
  isChecked: boolean | null
  showMenu: boolean | null
  action: string
}

type UserFetched = {
  id: number
  createdAt: string
  username: string
  email: string
  role: string
  validate_email: boolean
  blocked: boolean
}

type Response = {
  data: UserFetched[]
  message: string
  success: boolean
}

const { data: users } = await useAsyncData<Response>('users', () =>
  $fetch(`${config.public.baseURL}/users/admin/all-users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${xsrfToken}`,
    },
    credentials: 'include',
  })
)

// const fetchAllUsers = async () => {
//   const allUsersFetched = await $fetch(
//     `${config.public.baseURL}/users/admin/all-users`,
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${xsrfToken}`,
//       },
//       credentials: 'include',
//     }
//   )
// }

const usersData = computed(() => {
  if (users.value === null) {
    return []
  } else {
    return users.value.data.map((user) => ({
      ...user,
      isChecked: false,
      showMenu: false,
      action: '',
    }))
  }
})

const toggleShowMenu = (user: User) => {
  const newUsersData = usersData.value.map((u: User) => {
    if (u.id === user.id) {
      u.showMenu = !u.showMenu
    }
    return u
  })
  if (users.value === null) {
    return null
  } else {
    users.value.data = newUsersData
  }
}
const selectOption = (option: string, user: User) => {
  user.action = option
  user.showMenu = !user.showMenu
}
watchEffect(() => {
  if (masterCheckbox.value) {
    usersData.value.forEach((user) => {
      user.isChecked = true
    })
  } else {
    usersData.value.forEach((user) => {
      user.isChecked = false
    })
  }
})
definePageMeta({
  layout: 'admin',
})


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
      <AdminSearchBar />
      <div class="users-tab my-10">
        <div class="flex items-center text-sm">
          <div class="checkbox mr-10 flex">
            <input
              v-model="masterCheckbox"
              type="checkbox"
              class="h-[25px] w-[25px]"
            />
          </div>
          <div class="justify-around flex w-full">
            <div
              class="bg-white w-full border border-slate-300 text-center p-1"
            >
              Username
            </div>
            <div
              class="bg-white w-full border border-slate-300 text-center p-1"
            >
              Email
            </div>
            <div
              class="bg-white w-full border border-slate-300 text-center py-1"
            >
              Role
            </div>
            <div
              class="bg-white w-full border border-slate-300 text-center p-1"
            >
              Compte validé
            </div>
            <div
              class="bg-white w-full border border-slate-300 text-center p-1"
            >
              Créé le
            </div>
            <div
              class="bg-white w-full border border-slate-300 text-center relative p-1"
            >
              <span>Status</span>
              <span class="absolute right-[20px] top-[50%] filter"
                ><img src="@/assets/images/icons/icon-filter.svg" alt=""
              /></span>
            </div>
            <div
              class="bg-white w-full border border-slate-300 text-center p-1"
            >
              Actions
            </div>
          </div>
        </div>
        <div
          v-for="(user, i) in usersData"
          :key="i"
          class="flex items-center text-xs my-5 text-slate-500"
        >
          <div class="checkbox mr-10 flex">
            <input
              v-model="user.isChecked"
              type="checkbox"
              class="h-[25px] w-[25px]"
            />
          </div>
          <div class="justify-around flex w-full">
            <div
              class="bg-white w-full border border-slate-300 text-center p-1 flex items-center justify-center"
            >
              {{ user.username }}
              {{ user.showMenu }}
            </div>
            <div
              class="bg-white w-full border border-slate-300 text-center p-1 flex items-center justify-start overflow-y-auto"
            >
              {{ user.email }}
            </div>
            <div
              class="bg-white w-full border border-slate-300 text-center py-1 flex items-center justify-center"
            >
              {{ user.role }}
            </div>
            <div
              class="bg-white w-full border border-slate-300 text-center p-1 flex items-center justify-center"
            >
              {{ user.validate_email }}
            </div>
            <div
              class="bg-white w-full border border-slate-300 text-center p-1 flex items-center justify-center"
            >
              {{ getDate(user.createdAt) }}
            </div>
            <div
              class="bg-white w-full border border-slate-300 text-center p-1 flex items-center justify-center"
            >
              <span v-if="!user.blocked" class="actif inline-flex items-center"
                >Actif</span
              >
              <span v-else class="bannir inline-flex items-center">Banni</span>
            </div>
            <div class="bg-white w-full border border-slate-300 p-1">
              <div>
                <div class="relative dropdown">
                  <button
                    type="button"
                    class="flex items-center mx-auto"
                    @click="toggleShowMenu(user)"
                  >
                    <!-- {{ user.action }} -->
                    <svg
                      :class="user.showMenu ? 'rotate' : ''"
                      class="-mr-1 ml-2 h-5 w-5 arrow"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    v-if="user.showMenu"
                    class="divide-y divide-slate-300 absolute z-50 top-full py-2 -left-2 mt-2 bg-white rounded-md shadow-lg w-48 ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <a
                      href="#"
                      class="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900 actif"
                      role="menuitem"
                      @click.prevent="selectOption('Actif', user)"
                    >
                      <span>Actif</span>
                    </a>
                    <a
                      href="#"
                      class="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900 bannir"
                      role="menuitem"
                      @click.prevent="selectOption('Bannir', user)"
                    >
                      <span>Bannir</span>
                    </a>
                    <a
                      href="#"
                      class="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900 Supprimer"
                      role="menuitem"
                      @click.prevent="selectOption('Supprimer', user)"
                    >
                      <span>Supprimer</span>
                      <span class="ml-2"
                        ><img
                          src="@/assets/images/icons/corbeille.svg"
                          alt="icone corbeille"
                      /></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.actif {
  &:after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 5rem;
    background-color: #50d6b7;
    margin-left: 8px;
  }
}

.bannir {
  &:after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 5rem;
    background-color: #fbb369;
    margin-left: 8px;
  }
}
.arrow {
  transform: translateY(0.1rem);
}
.rotate {
  transform: translateY(-0.1rem) rotate(-180deg);
}
::-webkit-scrollbar {
  display: none;
}
.dropdown .actif {
  color: #50d6b7;
}
.dropdown .bannir {
  color: #fbb369;
  &:after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 5rem;
    background-color: #fbb369;
    margin-left: 8px;
  }
}
.dropdown .Supprimer {
  color: #f55a78;
}
.filter {
  transform: translateY(-50%);
}
input[type='checkbox'] {
  cursor: pointer;
}
</style>
