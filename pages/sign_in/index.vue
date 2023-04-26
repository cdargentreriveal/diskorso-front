<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})
const { $swal } = useNuxtApp()
const config = useRuntimeConfig()

const email = ref('')
const password = ref('')
const username = ref('')

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

const signup = async (email: string, password: string, username: string) => {
  if (email === '' || password === '' || username === '') {
    await displaySwal(
      'Error',
      'Merci de remplir tous les champs',
      'error',
      'Ok'
    )
  } else if (password.length < 8) {
    await displaySwal(
      'Error',
      'Le mot de passe doit comporter au moins 8 caractères',
      'error',
      'Ok'
    )
  } else if (password.search(/[a-z]/) < 0) {
    await displaySwal(
      'Error',
      'Le mot de passe doit comporter au moins une minuscule',
      'error',
      'Ok'
    )
  } else if (password.search(/[A-Z]/) < 0) {
    await displaySwal(
      'Error',
      'Le mot de passe doit comporter au moins une majuscule',
      'error',
      'Ok'
    )
  } else if (password.search(/[0-9]/) < 0) {
    await displaySwal(
      'Error',
      'Le mot de passe doit comporter au moins un chiffre',
      'error',
      'Ok'
    )
  } else {
    const response = await fetch(`${config.public.baseURL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    })
    const data = await response.json()

    if (data.success) {
      await displaySwal('Félicitations!', data.message, 'success', 'Ok')
    } else {
      displaySwal('Error!', data.message, 'error', 'Ok')
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
            S'inscrire <br />
            <span class="font-medium">sur Diskorso</span>
          </h2>
        </div>
        <form
          action=""
          class="my-8"
          @submit.prevent="signup(email, password, username)"
        >
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            class="rounded-md border border-gray w-full p-4 my-2"
          />
          <input
            v-model="email"
            type="mail"
            placeholder="Email"
            class="rounded-md border border-gray w-full p-4 my-2"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Mot de passe *"
            class="rounded-md border border-gray w-full p-4 my-2"
          />
          <p class="text-left text-xs pb-5 mt-2">
            Le mot de passe doit comporter au moins
            <span class="italic"
              >8 caractères, une minuscule, une majuscule et un chiffre</span
            >
          </p>
          <button
            type="submit"
            class="py-4 px-8 my-4 btn-submit rounded-md font-semibold w-full"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.btn-submit {
  background-color: #d9f028;
}
</style>
