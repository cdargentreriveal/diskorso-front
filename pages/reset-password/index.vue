<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})

interface GetAnswerLogin {
  success?: boolean
  message: string
  data: any
}

const config = useRuntimeConfig()
const email = ref('')
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

const sendResetPassword = async (email: string) => {
  const response = await fetch(
    `${config.public.baseURL}/auth/email/forgot-password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    }
  )
  const data = await response.json()

  if (data.error) {
    displaySwal('Error!', data.message, 'error', 'Ok')
  } else if (!data.success) {
    displaySwal('Error!', data.data.message, 'error', 'Ok')
  } else {
    displaySwal('E-Mail trouvé!', data.data.message, 'success', 'Ok')
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
