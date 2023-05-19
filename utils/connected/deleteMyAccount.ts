import { refreshToken } from '../connected/refreshToken'

export async function deleteMyAccount(baseURL: string) {
  try {
    const xsrfToken = localStorage.getItem('xsrfToken')
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${xsrfToken}`,
      },
      credentials: 'include' as RequestCredentials,
    }
    const response = await fetch(
      `${baseURL}/users/user-connected/delete-account`,
      options
    )
    const res = await response.json()
    if (res.statusCode === 401) {
      await refreshToken(baseURL)
      await fetch(`${baseURL}/users/user-connected/delete-account`, options)
    }
    if (res.ok) {
      return res
    } else {
      return 'Error'
    }
  } catch (error) {
    return error
  }
}
