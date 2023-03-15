import { useUserStore } from '~~/store/user'
export default defineNuxtRouteMiddleware(() => {
  const user = useUserStore()
  if (user.currentUser === null) return navigateTo('/login')
})
