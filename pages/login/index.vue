<script lang="ts" setup>
import { useUserStore } from '~~/store/user'
const userToStore = useUserStore()
const config = useRuntimeConfig()

definePageMeta({
  layout: 'page',
})

interface GetAnswerLogin {
  success?: boolean
  message: string
  data: any
}

const email = ref('')
const password = ref('')
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

const login = async (email: string, password: string) => {
  const response = await fetch(`${config.public.baseURL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email,
      password,
    }),
  })

  const data = await response.json()

  if (data.message !== 'LOGIN.SUCCEED') {
    displaySwal('Error!', data.message, 'error', 'Ok')
  } else {
    await localStorage.setItem('xsrfToken', data.data.xsrfToken)
    const user = await fetch(`${config.public.baseURL}/users/authenticated`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.data.xsrfToken}`,
      },
      credentials: 'include',
    })
    const userConnected = await user.json()
    if (userConnected.success) {
      await userToStore.setUser(userConnected.data)
      await navigateTo(`/admin`)
    } else {
      displaySwal('Error!', 'Echec de la connexion', 'error', 'Ok')
    }
  }
}
</script>

<template>
  <div class="container mx-auto">
    <div class="w-4/12 mx-auto my-10 -md:w-full">
      <div class="py-8 text-center">
        <div class="title uppercase font-bold text-4xl -md:text-3xl">
          <h2>
            Se connecter <br />
            <span class="font-medium">sur Diskorso</span>
          </h2>
        </div>
        <form action="" class="my-8" @submit.prevent="login(email, password)">
          <input
            v-model="email"
            type="mail"
            placeholder="Email"
            class="rounded-md border border-gray w-full p-4 my-2"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Mot de passe"
            class="rounded-md border border-gray w-full p-4 my-2"
          />
          <button
            type="submit"
            class="py-4 px-8 my-4 btn-submit rounded-md text-white font-semibold w-full"
          >
            Se connecter
          </button>
        </form>
        <p class="text-left font-medium">
          Mot de passe perdu ?
          <NuxtLink to="/reset-password" class="underline">
            Recevoir un nouveau mot de passe
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.btn-submit {
  background-color: #f55a78;
}
</style>
