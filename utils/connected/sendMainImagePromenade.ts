import { refreshToken } from '../connected/refreshToken'

export async function sendMainImagePromenade(baseUrl: string, file: FormData) {
  const xsrfToken = localStorage.getItem('xsrfToken')
  const options = {
    method: 'POST',
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${xsrfToken}`,
    },
    credentials: 'include' as RequestCredentials,
    body: file,
  }
  const response = await fetch(
    `${baseUrl}/promenadeditor/upload-main-image`,
    options
  )
  if (response.ok) {
    const data = await response.json()
    const urlMainImage = data.data
    if (urlMainImage.message) {
      return urlMainImage.message
    } else {
      return urlMainImage
    }
  } else {
    await refreshToken(baseUrl)
    const newResponse = await fetch(
      `${baseUrl}/promenadeditor/upload-main-image`,
      options
    )
    const newData = await newResponse.json()
    const urlMainImage = newData.data
    if (urlMainImage.message) {
      return urlMainImage.message
    } else {
      return urlMainImage
    }
  }
}
