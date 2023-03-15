<script lang="ts" setup>
import { useUserStore } from '~~/store/user'

const config = useRuntimeConfig()
const user = useUserStore()

const xsrfToken = localStorage.getItem('xsrfToken')

const getUsers = async () => {
  const listUsers = await fetch(`${config.public.baseURL}/users/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${xsrfToken}`,
    },
    credentials: 'include',
  })

  const response = await listUsers.json()

  if (response.statusCode === 401) {
    await localStorage.removeItem('xsrfToken')
    const request = await fetch(`${config.public.baseURL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${xsrfToken}`,
      },
      credentials: 'include',
    })
    const response = await request.json()
    await localStorage.setItem('xsrfToken', response.data.xsrfToken)
    const newXsrfToken = localStorage.getItem('xsrfToken')
    await fetch(`${config.public.baseURL}/users/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${newXsrfToken}`,
      },
      credentials: 'include',
    })
  }
}

const signOut = async () => {
  // Envoyer une requête POST à /auth/logout pour se déconnecter et vider les cookies
  await fetch(`${config.public.baseURL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })

  // Vider le token de localstorage et rediriger l'utilisateur vers la page de connexion
  localStorage.removeItem('xsrfToken')

  // Vider le store
  user.setUser(null)

  // Rediriger vers login
  await navigateTo(`/login`)
}
</script>

<template>
  <div
    class="menu fixed left-0 top-0 h-[100vh] bg-white w-[250px] box-shaddow z-10"
  >
    <div class="menu-admin pt-[160px] pb-[15px] h-full">
      <ul class="divide-y divide-slate-300">
        <li class="px-5 py-7 flex items-center gap-2 text-sm">
          <span
            ><img src="@/assets/images/icons/menu-admin/eye.svg" alt=""
          /></span>
          <span>Tutoriel</span>
        </li>
        <NuxtLink to="/admin" class="px-5 py-7 flex items-center gap-2 text-sm">
          <span
            ><img src="@/assets/images/icons/menu-admin/promenade.svg" alt=""
          /></span>
          <span>Mes promenades</span>
        </NuxtLink>
        <NuxtLink
          to="/admin/creer-une-promenade"
          class="px-5 py-7 flex items-center gap-2 text-sm"
        >
          <span
            ><img src="@/assets/images/icons/menu-admin/create.svg" alt=""
          /></span>
          <span>Créer une promenade</span>
        </NuxtLink>
        <li class="px-5 py-7 flex items-center gap-2 text-sm">
          <span
            ><img src="@/assets/images/icons/menu-admin/extrait.svg" alt=""
          /></span>
          <span>Mes extraits</span>
        </li>
      </ul>
      <ul class="divide-y divide-slate-300">
        <li class="px-5 py-7 flex items-center gap-2 text-sm">
          <span
            ><img src="@/assets/images/icons/menu-admin/compte.svg" alt=""
          /></span>
          <span>Mon compte</span>
        </li>
        <li class="px-5 py-7 flex items-center gap-2 text-sm">
          <span
            ><img src="@/assets/images/icons/menu-admin/deconnexion.svg" alt=""
          /></span>
          <button @click="signOut()">Déconnexion</button>
        </li>
      </ul>
      <button @click="getUsers()">Get all</button>
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
