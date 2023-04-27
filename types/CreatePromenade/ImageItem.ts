export interface ImageItem {
  type: 'image'
  file?: File | null
  imageUrl?: string | null
  id?: number
  key: string
  content?: string
  imagetoUpload?: FormData
}
