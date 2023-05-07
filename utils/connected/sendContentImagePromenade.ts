import { refreshToken } from '../connected/refreshToken'
import { ItemType } from '~~/types/CreatePromenade'

export async function sendContentImagePromenade(
  baseUrl: string,
  items: ItemType[]
) {
  const xsrfToken = localStorage.getItem('xsrfToken')

  // Map over the items array and replace the imageUrl property with the URL returned from sendImagePromenade
  const updatedItems = await Promise.all(
    items.map(async (item) => {
      if (
        item.type === 'image' &&
        !item.imageUrl?.startsWith('https://diskord-api.s3')
      ) {
        const file = item.imagetoUpload
        const options = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${xsrfToken}`,
          },
          credentials: 'include' as RequestCredentials,
          body: file,
        }
        const response = await fetch(
          `${baseUrl}/promenadeditor/upload-image-promenade`,
          options
        )
        if (response.ok) {
          const data = await response.json()
          const url = data.data
          if (url.message) {
            throw new Error(url.message)
          } else {
            return {
              ...item,
              imageUrl: url,
            }
          }
        } else {
          await refreshToken(baseUrl)
          const newResponse = await fetch(
            `${baseUrl}/promenadeditor/upload-image-promenade`,
            options
          )
          const newData = await newResponse.json()
          const url = newData.data
          if (url.message) {
            throw new Error(url.message)
          } else {
            return {
              ...item,
              imageUrl: url,
            }
          }
        }
      } else {
        // If the item type is not 'image', return the item unchanged
        return item
      }
    })
  )
  return updatedItems
}
