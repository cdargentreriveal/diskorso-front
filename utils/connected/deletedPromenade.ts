import { refreshToken } from '../connected/refreshToken'
import { useUserStore } from '~~/store/user'
import { useExtractStore } from '~~/store/extracts'
import { usePromenadeStore } from '~~/store/promenade'
import { ExtractFetched } from '~~/types/Extracts'

const userToStore = useUserStore()
const extractToStore = useExtractStore()
const promenadeToStore = usePromenadeStore()

export async function deletedPromenade(baseURL: string, data: object) {
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
    const response = await fetch(`${baseURL}/promenadeditor/delete`, options)
    const res = await response.json()
    const user = await fetch(`${baseURL}/users/user-connected`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${xsrfToken}`,
      },
      credentials: 'include',
    })
    const userConnected = await user.json()
    if (userConnected.success) {
      const userToRegister = {
        id: userConnected.data.id,
        username: userConnected.data.username,
        email: userConnected.data.email,
        role: userConnected.data.role,
        picture: userConnected.data.picture,
        createdAt: userConnected.data.createdAt,
        publishedPromenadesCount: userConnected.data.publishedPromenadesCount,
        unpublishedPromenadesCount:
          userConnected.data.unpublishedPromenadesCoun,
        usedExtractsCount: userConnected.data.usedExtractsCountt,
        totalExtracts: userConnected.data.totalExtracts,
      }
      await userToStore.setUser(userToRegister)
      await extractToStore.setExtractsFromdb(
        userConnected.data.extracts
          .map((extract: ExtractFetched) => ({
            ...extract,
            updatedAt: new Date(extract.updatedAt),
            showModal: false,
          }))
          .sort(
            (a: ExtractFetched, b: ExtractFetched) =>
              b.updatedAt.getTime() - a.updatedAt.getTime() // Inverser l'ordre de comparaison
          )
      )
      await promenadeToStore.setPromenadesFromdb(userConnected.data.promenades)
      const userDataJSON = JSON.stringify(userToRegister)
      const extractsDataJson = JSON.stringify(
        userConnected.data.extracts
          .map((extract: ExtractFetched) => ({
            ...extract,
            updatedAt: new Date(extract.updatedAt),
            showModal: false,
          }))
          .sort(
            (a: ExtractFetched, b: ExtractFetched) =>
              b.updatedAt.getTime() - a.updatedAt.getTime() // Inverser l'ordre de comparaison
          )
      )
      const promenadesDataJson = JSON.stringify(userConnected.data.promenades)
      await sessionStorage.setItem('user_data', userDataJSON)
      await sessionStorage.setItem('extracts', extractsDataJson)
      await sessionStorage.setItem('promenades', promenadesDataJson)
      await navigateTo(`/dashboard`)
    } else {
      // eslint-disable-next-line no-console
      console.log('error new data')
    }
    if (res.statusCode === 401) {
      await refreshToken(baseURL)
      await fetch(`${baseURL}/promenadeditor/delete`, options)
      const user = await fetch(`${baseURL}/users/user-connected`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${xsrfToken}`,
        },
        credentials: 'include',
      })
      const userConnected = await user.json()
      if (userConnected.success) {
        const userToRegister = {
          id: userConnected.data.id,
          username: userConnected.data.username,
          email: userConnected.data.email,
          role: userConnected.data.role,
          picture: userConnected.data.picture,
          createdAt: userConnected.data.createdAt,
          publishedPromenadesCount: userConnected.data.publishedPromenadesCount,
          unpublishedPromenadesCount:
            userConnected.data.unpublishedPromenadesCoun,
          usedExtractsCount: userConnected.data.usedExtractsCountt,
          totalExtracts: userConnected.data.totalExtracts,
        }
        await userToStore.setUser(userToRegister)
        await extractToStore.setExtractsFromdb(
          userConnected.data.extracts
            .map((extract: ExtractFetched) => ({
              ...extract,
              updatedAt: new Date(extract.updatedAt),
              showModal: false,
            }))
            .sort(
              (a: ExtractFetched, b: ExtractFetched) =>
                b.updatedAt.getTime() - a.updatedAt.getTime() // Inverser l'ordre de comparaison
            )
        )
        await promenadeToStore.setPromenadesFromdb(
          userConnected.data.promenades
        )
        const userDataJSON = JSON.stringify(userToRegister)
        const extractsDataJson = JSON.stringify(
          userConnected.data.extracts
            .map((extract: ExtractFetched) => ({
              ...extract,
              updatedAt: new Date(extract.updatedAt),
              showModal: false,
            }))
            .sort(
              (a: ExtractFetched, b: ExtractFetched) =>
                b.updatedAt.getTime() - a.updatedAt.getTime() // Inverser l'ordre de comparaison
            )
        )
        const promenadesDataJson = JSON.stringify(userConnected.data.promenades)
        await sessionStorage.setItem('user_data', userDataJSON)
        await sessionStorage.setItem('extracts', extractsDataJson)
        await sessionStorage.setItem('promenades', promenadesDataJson)
        await navigateTo(`/dashboard`)
      } else {
        // eslint-disable-next-line no-console
        console.log('error new data')
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
