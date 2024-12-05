<script lang="ts" setup>
import { useUserStore } from '~~/store/user'
import { useExtractStore } from '~~/store/extracts'
import { usePromenadeStore } from '~~/store/promenade'
import { ExtractFetched } from '~~/types/Extracts'
const userToStore = useUserStore()
const extractToStore = useExtractStore()
const promenadeToStore = usePromenadeStore()
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
    const user = await fetch(`${config.public.baseURL}/users/user-connected`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.data.xsrfToken}`,
      },
      credentials: 'include',
    })
    const userConnected = await user.json()
    if (userConnected.success) {
      const userToRegister = {
        id: userConnected.data.id,
        username: userConnected.data.username,
        email: userConnected.data.email,
        role: userConnected.data.role,
        picture: userConnected.data.picture,
        createdAt: userConnected.data.createdAt,
        publishedPromenadesCount: userConnected.data.publishedPromenadesCount,
        unpublishedPromenadesCount:
          userConnected.data.unpublishedPromenadesCoun,
        usedExtractsCount: userConnected.data.usedExtractsCountt,
        totalExtracts: userConnected.data.totalExtracts,
      }
      await userToStore.setUser(userToRegister)
      await extractToStore.setExtractsFromdb(
        userConnected.data.extracts
          .map((extract: ExtractFetched) => ({
            ...extract,
            updatedAt: new Date(extract.updatedAt),
            showModal: false,
          }))
          .sort(
            (a: ExtractFetched, b: ExtractFetched) =>
              b.updatedAt.getTime() - a.updatedAt.getTime() // Inverser l'ordre de comparaison
          )
      )
      await promenadeToStore.setPromenadesFromdb(userConnected.data.promenades)
      const userDataJSON = JSON.stringify(userToRegister)
      const extractsDataJson = JSON.stringify(
        userConnected.data.extracts
          .map((extract: ExtractFetched) => ({
            ...extract,
            updatedAt: new Date(extract.updatedAt),
            showModal: false,
          }))
          .sort(
            (a: ExtractFetched, b: ExtractFetched) =>
              b.updatedAt.getTime() - a.updatedAt.getTime() // Inverser l'ordre de comparaison
          )
      )
      const promenadesDataJson = JSON.stringify(userConnected.data.promenades)
      await sessionStorage.setItem('user_data', userDataJSON)
      await sessionStorage.setItem('extracts', extractsDataJson)
      await sessionStorage.setItem('promenades', promenadesDataJson)
      await navigateTo(`/dashboard`)
    } else {
      displaySwal('Error!', 'Echec de la connexion', 'error', 'Ok')
    }
  }
}
</script>

<template>
  <div class="container mx-auto">
    <div class="xl:w-4/12 mx-auto my-10 w-9/12">
      <div class="py-8 text-center -sm:px-4 hidden xl:inline-block">
        <div class="title uppercase font-bold text-xl 2xl:text-4xl xl:text-3xl">
          <h2>
            Se connecter<br />
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
      <div class="py-8 text-center -sm:px-4 xl:hidden inline-block">
        <div class="title uppercase font-bold xl:text-4xl text-2xl md:text-3xl">
          <h2>
            POur une meilleure expérience <br />
            <span class="font-medium">passer sur grand écran</span>
          </h2>
        </div>
        <!-- <NuxtLink to="/">
          <div class="my-10 py-3 border border-black rounded-md mx-8">
            Retour a l'accueil
          </div>
        </NuxtLink> -->
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
