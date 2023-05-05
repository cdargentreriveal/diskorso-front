import { refreshToken } from '../connected/refreshToken'
import { useUserStore } from '~~/store/user'

const userToStore = useUserStore()

export async function createdPromenade(baseURL: string, data: any) {
  const xsrfToken = localStorage.getItem('xsrfToken')
  const response = await fetch(`${baseURL}/promenadeditor/create-promenade`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${xsrfToken}`,
    },
    credentials: 'include' as RequestCredentials,
    body: JSON.stringify(data),
  })
  if (response.status === 201) {
    const dataFethed = await response.json()
    return dataFethed
  } else {
    await refreshToken(baseURL)
    const dataUpdated = await fetch(
      `${baseURL}/promenadeditor/create-promenade`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${xsrfToken}`,
        },
        credentials: 'include' as RequestCredentials,
        body: JSON.stringify(data),
      }
    )
    const currentUser = userToStore.currentUser
    if (data.published) {
      const publishedPromenadesCount = currentUser!.publishedPromenadesCount + 1
      userToStore.setUser({
        ...currentUser!,
        publishedPromenadesCount,
      })
    } else {
      const unpublishedPromenadesCount =
        currentUser!.unpublishedPromenadesCount + 1
      userToStore.setUser({
        ...currentUser!,
        unpublishedPromenadesCount,
      })
    }
    const dataFethed = await dataUpdated.json()
    return dataFethed
  }
}
