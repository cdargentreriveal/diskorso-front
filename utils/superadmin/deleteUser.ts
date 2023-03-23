import { refreshToken } from '../connected/refreshToken'

const config = useRuntimeConfig()

export async function deleteUser(id: number) {
  const xsrfToken = localStorage.getItem('xsrfToken')
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${xsrfToken}`,
    },
    credentials: 'include' as RequestCredentials,
  }
  const listUsers = await fetch(`${config.public.baseURL}/users/${id}`, options)
  const response = await listUsers.json()
  if (response.statusCode === 401) {
    await refreshToken()
    await fetch(`${config.public.baseURL}/users/${id}`, options)
  }
}
