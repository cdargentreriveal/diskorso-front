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

  console.log(data)

  if (data.error) {
    $swal.fire({
      title: 'Error!',
      text: data.message,
      icon: 'error',
      confirmButtonText: 'Ok',
    })
  } else if (!data.success) {
    $swal.fire({
      title: 'Error!',
      text: data.data.message,
      icon: 'error',
      confirmButtonText: 'Ok',
    })
  } else {
    $swal.fire({
      title: 'E-Mail trouvé!',
      text: data.data.message,
      icon: 'success',
      confirmButtonText: 'Ok',
    })
  }
}
</script>

<template>
  <div class="container mx-auto">
    <div class="w-4/12 mx-auto my-10 -md:w-full">
      <div class="py-8 text-center">
        <div class="title uppercase font-bold text-4xl -md:text-3xl">
          <h2>
            Renouvellement <br />
            <span class="font-medium">mot de passe</span>
          </h2>
        </div>
        <form action="" class="my-8" @submit.prevent="sendResetPassword(email)">
          <input
            v-model="email"
            type="mail"
            placeholder="Email"
            class="rounded-md border border-gray w-full p-4 my-2"
          />
          <button
            type="submit"
            class="py-4 px-8 my-4 btn-submit rounded-md text-white font-semibold w-full"
          >
            Renouveler mon mot de passe
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
