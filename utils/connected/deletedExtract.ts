import { refreshToken } from '../connected/refreshToken'

export async function deletedExtract(baseURL: string, data: object) {
  try {
    const xsrfToken = localStorage.getItem('xsrfToken')
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${xsrfToken}`,
      },
      credentials: 'include' as RequestCredentials,
      body: JSON.stringify(data),
    }
    const response = await fetch(`${baseURL}/extract/user-connected`, options)
    const res = await response.json()
    if (res.statusCode === 401) {
      await refreshToken(baseURL)
      await fetch(`${baseURL}/extract/user-connected`, options)
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
