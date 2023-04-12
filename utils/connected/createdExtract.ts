import { refreshToken } from '../connected/refreshToken'
import { useUserStore } from '~~/store/user'

const userToStore = useUserStore()

export async function createdExtract(baseURL: string, data: object) {
  const xsrfToken = localStorage.getItem('xsrfToken')
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${xsrfToken}`,
    },
    credentials: 'include' as RequestCredentials,
    body: JSON.stringify(data),
  }
  const response = await fetch(`${baseURL}/extract/create`, options)
  if (response.ok) {
    const data = await response.json()
    const currentUser = userToStore.currentUser
    if (currentUser) {
      const totalExtracts = currentUser.totalExtracts + 1
      userToStore.setUser({
        ...currentUser,
        totalExtracts,
      })
    }
    return data
  } else {
    const data = await response.json()
    await refreshToken(baseURL)
    await fetch(`${baseURL}/extract/create`, options)
    const currentUser = userToStore.currentUser
    if (currentUser) {
      const totalExtracts = currentUser.totalExtracts + 1
      userToStore.setUser({
        ...currentUser,
        totalExtracts,
      })
    }
    return data
  }
}
