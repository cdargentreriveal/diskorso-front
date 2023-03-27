import { refreshToken } from '../connected/refreshToken'
import { useUserStore } from '~~/store/user'

const userToStore = useUserStore()

export async function modifyAvatar(baseUrl: string, file: FormData) {
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
    `${baseUrl}/users/user-connected/upload-avatar`,
    options
  )
  if (response.ok) {
    const data = await response.json()
    const newAvatarUrl = data.data
    userToStore.currentUser!.picture = newAvatarUrl
    return data
  } else {
    const data = await response.json()
    await refreshToken(baseUrl)
    await fetch(`${baseUrl}/users/user-connected/upload-avatar`, options)
    return data
  }
}
