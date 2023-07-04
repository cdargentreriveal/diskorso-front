import { useUserStore } from '~~/store/user'

export default defineNuxtRouteMiddleware(() => {
  // skip middleware during HMR
  if (process.server) return

  const userStore = useUserStore()

  if (userStore.currentUser === null) {
    let xsrfToken: any = null

    // Vérifier si le xsrfToken existe dans le localStorage (côté client uniquement)
    if (process.client) {
      xsrfToken = localStorage.getItem('xsrfToken')
    }

    if (!xsrfToken) {
      // Rediriger vers la page de connexion si le xsrfToken n'existe pas
      return navigateTo('/login')
    }
  }
})
