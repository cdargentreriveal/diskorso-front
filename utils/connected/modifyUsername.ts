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
  if (listUsers.status === 200) {
    const dataFethed = await listUsers.json()
    userToStore.currentUser!.username = dataFethed.data.username
    return dataFethed
  } else {
    await refreshToken(baseUrl)
    await refreshToken(baseUrl)
    const listUsersAdapated = await fetch(
      `${baseUrl}/users/admin/modify-username`,
      options
    )
    const response2 = await listUsersAdapated.json()
    userToStore.currentUser!.username = response2.data.username
    return response2
  }
}
