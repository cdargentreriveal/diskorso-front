import { refreshToken } from '../connected/refreshToken'

export async function deleteContentImagePromenade(baseUrl: string, data: any) {
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
  const response = await fetch(
    `${baseUrl}/promenadeditor/delete-image-promenade`,
    options
  )
  if (response.ok) {
    const data = await response.json()
  } else {
    await refreshToken(baseUrl)
    const newResponse = await fetch(
      `${baseUrl}/promenadeditor/delete-image-promenade`,
      options
    )
    const newData = await newResponse.json()
  }
}
