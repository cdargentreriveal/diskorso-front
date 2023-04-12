import { refreshToken } from '../connected/refreshToken'
import { useUserStore } from '~~/store/user'

const userToStore = useUserStore()

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
    const currentUser = userToStore.currentUser
    if (currentUser) {
      const totalExtracts = currentUser.totalExtracts - 1
      userToStore.setUser({
        ...currentUser,
        totalExtracts,
      })
    }
    if (res.statusCode === 401) {
      await refreshToken(baseURL)
      await fetch(`${baseURL}/extract/user-connected`, options)
      const currentUser = userToStore.currentUser
      if (currentUser) {
        const totalExtracts = currentUser.totalExtracts - 1
        userToStore.setUser({
          ...currentUser,
          totalExtracts,
        })
      }
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
