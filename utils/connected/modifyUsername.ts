import { refreshToken } from '../connected/refreshToken'
import { useUserStore } from '~~/store/user'

const userToStore = useUserStore()

export async function modifyUsername(baseUrl: string, username: string) {
  const xsrfToken = localStorage.getItem('xsrfToken')
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${xsrfToken}`,
    },
    credentials: 'include' as RequestCredentials,
    body: JSON.stringify({
      username,
    }),
  }
  const listUsers = await fetch(
    `${baseUrl}/users/admin/modify-username`,
    options
  )
  const response = await listUsers.json()
  if (response.statusCode === 401) {
    await refreshToken(baseUrl)
    await fetch(`${baseUrl}/users/admin/modify-username`, options)
  }
  if (response.success) {
    userToStore.setUser(response.data)
  }
  return response
}
