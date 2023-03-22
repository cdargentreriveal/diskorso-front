<script lang="ts" setup>
const selectedOption = ref('Selectionner')
type User = {
  name: string
  firstName: string
  userName: string
  mail: string
  status: string
  selectedStatus: string
  showMenu: boolean
}

const users = reactive<User[]>([
  {
    name: 'Bridoux',
    firstName: 'Florian',
    userName: 'FB0305',
    mail: 'bridoux.florian@gmail.com',
    status: 'Actif',
    selectedStatus: 'Selectionner',
    showMenu: false,
  },
  {
    name: "D'argentré",
    firstName: 'Charles',
    userName: 'CD0305',
    mail: 'cdargentre@gmail.com',
    status: 'Actif',
    selectedStatus: 'Selectionner',
    showMenu: false,
  },
])

const toggleMenu = (user: User) => {
  user.showMenu = !user.showMenu
}
const selectOption = (option: string, user: User) => {
  user.selectedStatus = option
  user.showMenu = !user.showMenu
}
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
      title-black="Gérer les"
      title-purple="utilisateurs"
      action-btn="Publier"
    />
    <div class="container_promenade w-9/12 mx-auto">
      <AdminSearchBar />
      <div class="users-tab my-10">
        <div class="flex items-center text-sm">
          <div class="checkbox mr-10 flex">
            <input type="checkbox" class="h-[25px] w-[25px]" />
          </div>
          <div class="justify-around flex w-full">
            <div
              class="bg-white w-full border border-slate-300 text-center py-1"
            >
              Nom
            </div>
            <div
              class="bg-white w-full border border-slate-300 text-center p-1"
            >
              Prénom
            </div>
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
              Actif
            </div>
          </div>
        </div>
        <!--  users -->
        <div
          v-for="(user, i) in users"
          :key="i"
          class="flex items-center text-xs my-5 text-slate-500"
        >
          <div class="checkbox mr-10 flex">
            <input type="checkbox" class="h-[25px] w-[25px]" />
          </div>
          <div class="justify-around flex w-full">
            <div
              class="bg-white w-full border border-slate-300 text-center py-1 flex items-center justify-center"
            >
              {{ user.name }}
            </div>
            <div
              class="bg-white w-full border border-slate-300 text-center p-1 flex items-center justify-center"
            >
              {{ user.firstName }}
            </div>
            <div
              class="bg-white w-full border border-slate-300 text-center p-1 flex items-center justify-center"
            >
              {{ user.userName }}
            </div>
            <div
              class="bg-white w-full border border-slate-300 text-center p-1 flex items-center justify-start overflow-y-auto"
            >
              {{ user.mail }}
            </div>
            <div
              class="bg-white w-full border border-slate-300 text-center p-1 flex items-center justify-center"
            >
              <span class="actif inline-flex items-center">{{
                user.status
              }}</span>
            </div>
            <div class="bg-white w-full border border-slate-300 p-1">
              <div>
                <div class="relative dropdown">
                  <button
                    type="button"
                    class="flex items-center mx-auto"
                    @click="toggleMenu(user)"
                  >
                    {{ user.selectedStatus }}
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
                      class="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900 delete"
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
.dropdown .delete {
  color: #f55a78;
}
.filter {
  transform: translateY(-50%);
}
</style>
