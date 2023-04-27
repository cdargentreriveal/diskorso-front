import { refreshToken } from '../connected/refreshToken'

export async function editedExtract(baseURL: string, data: object) {
  const xsrfToken = localStorage.getItem('xsrfToken')
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${xsrfToken}`,
    },
    credentials: 'include' as RequestCredentials,
    body: JSON.stringify(data),
  }
  const response = await fetch(`${baseURL}/extract/edit`, options)
  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    const data = await response.json()
    await refreshToken(baseURL)
    await fetch(`${baseURL}/extract/edit`, options)
    return data
  }
}
