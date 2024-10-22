import { useUserStore } from '~~/store/user'

export default defineNuxtRouteMiddleware((to, from) => {
  // Skip middleware during HMR or SSR
  if (process.server) return

  const userStore = useUserStore()

  // Vérification côté client
  if (process.client) {
    const xsrfToken: string | null = localStorage.getItem('xsrfToken')

    if (userStore.currentUser === null && !xsrfToken) {
      // Rediriger vers la page de connexion si le xsrfToken n'existe pas
      return navigateTo('/login')
    }
  }
})
