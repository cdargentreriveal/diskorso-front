<script lang="ts" setup>
import { getUsers } from '~~/utils/superadmin/getUsers'
import { logOut } from '~~/utils/connected/logOut'
import { useUserStore } from '~~/store/user'
const user = useUserStore()
const config = useRuntimeConfig()
</script>

<template>
  <div
    class="menu fixed left-0 top-0 h-[100vh] bg-white w-[220px] z-10 border-r-1 border-slate-300"
  >
    <div class="menu-admin pt-[150px] pb-[10px] h-full">
      <ul class="divide-y divide-slate-300 text-xs">
        <li class="px-5 py-7 flex items-center gap-2">
          <span class="w-[16px]"
            ><img src="@/assets/images/icons/menu-admin/eye.svg" alt=""
          /></span>
          <span>Tutoriel</span>
        </li>
        <NuxtLink to="/dashboard" class="px-5 py-7 flex items-center gap-2">
          <span class="w-[16px]"
            ><img src="@/assets/images/icons/menu-admin/promenade.svg" alt=""
          /></span>
          <span>Mes promenades</span>
        </NuxtLink>
        <NuxtLink
          to="/dashboard/creer-une-promenade"
          class="px-5 py-7 flex items-center gap-2"
        >
          <span class="w-[16px]"
            ><img src="@/assets/images/icons/menu-admin/create.svg" alt=""
          /></span>
          <span>Créer une promenade</span>
        </NuxtLink>
        <NuxtLink
          to="/dashboard/mes-extraits"
          class="px-5 py-7 flex items-center gap-2"
        >
          <span class="w-[16px]"
            ><img src="@/assets/images/icons/menu-admin/extrait.svg" alt=""
          /></span>
          <span>Mes extraits</span>
        </NuxtLink>
        <!-- Super Admin Menu -->
        <div
          v-if="user.currentUser?.role === 'admin'"
          class="super_admin divide-y divide-slate-300"
        >
          <NuxtLink
            to="/dashboard/gestion-utilisateurs"
            class="px-5 py-7 flex items-center gap-2 bg-slate-100"
          >
            <span class="w-[16px]"
              ><img src="@/assets/images/icons/menu-admin/user.svg" alt=""
            /></span>
            <span>Gérer les utilisateurs</span>
            <span class="-mt-[1rem]"
              ><img
                src="@/assets/images/icons/menu-admin/super-admin-star.svg"
                alt=""
            /></span>
          </NuxtLink>
          <li class="px-5 py-7 flex items-center gap-2 bg-slate-100">
            <span class="w-[16px]"
              ><img src="@/assets/images/icons/menu-admin/promenade.svg" alt=""
            /></span>
            <span>Gérer les promenades</span>
            <span class="-mt-[1rem]"
              ><img
                src="@/assets/images/icons/menu-admin/super-admin-star.svg"
                alt=""
            /></span>
          </li>
          <li class="px-5 py-7 flex items-center gap-2 bg-slate-100">
            <span
              ><img src="@/assets/images/icons/menu-admin/extrait.svg" alt=""
            /></span>
            <span>Gérer les extraits</span>
            <span class="-mt-[1rem]"
              ><img
                src="@/assets/images/icons/menu-admin/super-admin-star.svg"
                alt=""
            /></span>
          </li>
        </div>
        <!-- Super Admin Menu-->
      </ul>
      <ul class="divide-y divide-slate-300 text-xs">
        <NuxtLink
          to="/dashboard/account"
          class="px-5 py-7 flex items-center gap-2"
        >
          <span class="w-[16px]"
            ><img src="@/assets/images/icons/menu-admin/compte.svg" alt=""
          /></span>
          <span>Mon compte</span>
        </NuxtLink>
        <li class="px-5 py-7 flex items-center gap-2">
          <span class="w-[16px]"
            ><img src="@/assets/images/icons/menu-admin/deconnexion.svg" alt=""
          /></span>
          <button @click.prevent="logOut(config.public.baseURL)">
            Déconnexion
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.router-link-active {
  color: var(--purple-color);
  img {
    filter: invert(30%) sepia(100%) saturate(2878%) hue-rotate(230deg)
      brightness(110%) contrast(100%);
  }
}

.menu-admin {
  display: flex;
  flex-direction: column;
}
a,
li {
  cursor: pointer;
  color: var(--gray-color);
  &:hover {
    color: var(--purple-color);
    img {
      filter: invert(30%) sepia(100%) saturate(2878%) hue-rotate(230deg)
        brightness(110%) contrast(100%);
    }
  }
}

ul:first-child {
  flex-grow: 1;
}
</style>
