import { refreshToken } from './refreshToken'
import { useUserStore } from '~~/store/user'

const userToStore = useUserStore()

export async function unPublishPromenade(baseURL: string, id: number) {
  const xsrfToken = localStorage.getItem('xsrfToken')
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${xsrfToken}`,
    },
    credentials: 'include' as RequestCredentials,
    body: JSON.stringify({
      id,
    }),
  }
  const response = await fetch(
    `${baseURL}/promenadeditor/unpublish-promenade`,
    options
  )
  if (response.ok) {
    const data = await response.json()
    const currentUser = userToStore.currentUser
    if (currentUser) {
      const publishedPromenadesCount = currentUser.publishedPromenadesCount - 1
      const unpublishedPromenadesCount =
        currentUser.unpublishedPromenadesCount + 1
      userToStore.setUser({
        ...currentUser,
        publishedPromenadesCount,
        unpublishedPromenadesCount,
      })
    }
    return data
  } else {
    const data = await response.json()
    await refreshToken(baseURL)
    await fetch(`${baseURL}/promenadeditor/unpublish-promenade`, options)
    const currentUser = userToStore.currentUser
    if (currentUser) {
      const publishedPromenadesCount = currentUser.publishedPromenadesCount - 1
      const unpublishedPromenadesCount =
        currentUser.unpublishedPromenadesCount + 1
      userToStore.setUser({
        ...currentUser,
        publishedPromenadesCount,
        unpublishedPromenadesCount,
      })
    }
    return data
  }
}
