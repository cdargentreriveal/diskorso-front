import { refreshToken } from '../connected/refreshToken'
import { useUserStore } from '~~/store/user'
const user = useUserStore()

export async function logOut(baseUrl: string) {
  // Envoyer une requête POST à /auth/logout pour se déconnecter et vider les cookies
  await fetch(`${baseUrl}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })
  // Vider le token de localstorage et rediriger l'utilisateur vers la page de connexion
  localStorage.removeItem('xsrfToken')
  // Vider le store
  user.setUser(null)
  // Rediriger vers login
  await navigateTo(`/login`)
}
