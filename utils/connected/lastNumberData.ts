import { refreshToken } from '../connected/refreshToken'

export async function lastNumberData(baseURL: string, endpoint: string) {
  let xsrfTokenTime: any = null
  if (process.client) {
    xsrfTokenTime = localStorage.getItem('xsrfToken_time')
  }
  if (xsrfTokenTime !== null && Date.now() >= +xsrfTokenTime - 2000) {
    await refreshToken(baseURL)
  }
  const xsrfToken = localStorage.getItem('xsrfToken')
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${xsrfToken}`,
    },
    credentials: 'include' as RequestCredentials,
  }
  const response = await fetch(`${baseURL}/${endpoint}`, options)
  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    const data = await response.json()
    await refreshToken(baseURL)
    await fetch(`${baseURL}/${endpoint}`, options)
    return data
  }
}
