import { refreshToken } from '../connected/refreshToken'
import { useUserStore } from '~~/store/user'

const userToStore = useUserStore()

export async function createdPromenade(baseURL: string, data: object) {
  try {
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

    if (response.ok) {
      // Handle successful response
    } else {
      // Handle failed response
    }
  } catch (error) {
    console.error(error)
  }
}
