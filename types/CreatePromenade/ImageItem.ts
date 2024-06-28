export interface ImageItem {
  type: 'image'
  file?: File | null
  imageUrl: string | null
  index: number
  id?: number
  key: string
  content?: string
  source?: string
  imagetoUpload?: FormData
}
