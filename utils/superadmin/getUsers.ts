import { refreshToken } from '../connected/refreshToken'

export async function getUsers(baseUrl: string) {
  const xsrfToken = localStorage.getItem('xsrfToken')
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${xsrfToken}`,
    },
    credentials: 'include' as RequestCredentials,
  }
  const listUsers = await fetch(`${baseUrl}/users/all`, options)
  const response = await listUsers.json()
  if (response.statusCode === 401) {
    await refreshToken(baseUrl)
    await fetch(`${baseUrl}/users/all`, options)
  }
}
