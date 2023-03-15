<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})
const route = useRoute()
const config = useRuntimeConfig()

const token = ref(route.query.token)
const email = ref(route.query.email)
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

const newPassword = async (token: any, email: any, password: string) => {
  if (email === '' || password === '') {
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
    const response = await fetch(
      `${config.public.baseURL}/auth/email/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          email_token: token,
        }),
      }
    )
    const data = await response.json()

    if (data.statusCode === 403) {
      displaySwal('Error!', data.message, 'error', 'Ok')
    } else if (data.success) {
      await displaySwal("C'est bien noté!", data.message, 'success', 'Ok')
      await navigateTo(`/login`)
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
            Nouveau <br />
            <span class="font-medium">mot de passe</span>
          </h2>
        </div>
        <form
          action=""
          class="my-8"
          @submit.prevent="newPassword(token, email, password)"
        >
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
            Ok
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.btn-submit {
  background-color: #f55a78;
}
</style>
