import { refreshToken } from '../connected/refreshToken'
import { useUserStore } from '~~/store/user'

const userToStore = useUserStore()

export async function modifyEmail(baseUrl: string, email: string) {
  const xsrfToken = localStorage.getItem('xsrfToken')
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${xsrfToken}`,
    },
    credentials: 'include' as RequestCredentials,
    body: JSON.stringify({
      email,
    }),
  }
  const res = await fetch(`${baseUrl}/users/admin/modify-email`, options)
  const response = await res.json()
  if (response.statusCode === 401) {
    await refreshToken(baseUrl)
    await fetch(`${baseUrl}/users/admin/modify-email`, options)
  }
  if (response.success) {
    userToStore.setUser(response.data)
  }
  return response
}
