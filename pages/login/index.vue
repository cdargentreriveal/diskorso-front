<script lang="ts" setup>
import { useUserStore } from '~~/store/user'
const userToStore = useUserStore()

const { $swal } = useNuxtApp()

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

const login = async (email: string, password: string) => {
  const response = await fetch('http://localhost:4000/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // withCredntials: true,
    credentials: 'include',
    body: JSON.stringify({
      email,
      password,
    }),
  })

  const data = await response.json()

  if (data.message !== 'LOGIN.SUCCEED') {
    $swal.fire({
      title: 'Error!',
      text: data.message,
      icon: 'error',
      confirmButtonText: 'Ok',
    })
  } else {
    await localStorage.setItem('xsrfToken', data.data.xsrfToken)
    const user = await fetch('http://localhost:4000/users/authenticated', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.data.xsrfToken}`,
      },
      credentials: 'include',
    })
    const userConnected = await user.json()
    await userToStore.setUser(userConnected.data)
    await navigateTo(`/admin`)
  }
}

const sendResetPassword = async (email: string) => {
  const response = await fetch(
    'http://localhost:4000/auth/email/forgot-password',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // withCredntials: true,
      // credentials: 'include',
      body: JSON.stringify({
        email,
      }),
    }
  )
  const data = await response.json()
  $swal.fire({
    title: 'Error!',
    text: data.message,
    icon: 'error',
    confirmButtonText: 'Ok',
  })
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
        <p class="text-left font-medium">
          Mot de passe perdu ?
          <NuxtLink to="/reset-password/fer" class="underline"> test</NuxtLink>
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
