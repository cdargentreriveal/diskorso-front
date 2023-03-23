// const url =
`http://localhost:4000/auth/email/verify?token=${token}&email=${encodeURIComponent(
// user.email, // )}`;

<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})
const route = useRoute()
const config = useRuntimeConfig()
const { $swal } = useNuxtApp()

const token = ref(route.query.token)
const email = ref(route.query.email)

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

const validateInscription = async (email: any, token: any) => {
  const response = await fetch(
    `${config.public.baseURL}/auth/email/verify?token=${token}&email=${email}`
  )
  const data = await response.json()
  if (data.error) {
    await displaySwal('Error!', data.message, 'error', 'Ok')
    await navigateTo(`/sign_in`)
  } else if (!data.success) {
    await displaySwal('Error!', data.message, 'error', 'Ok')
    await navigateTo(`/sign_in`)
  } else {
    await displaySwal('Félicitations!', data.message, 'success', 'Ok')
    await navigateTo(`/login`)
  }
}
onMounted(() => {
  validateInscription(email.value, token.value)
})
</script>
<template>
  <div></div>
</template>
