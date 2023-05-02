export interface ExcerptItem {
  type: 'excerpt'
  id: number
  index: number
  content: string
  key: string
  imageUrl?: string
  imagetoUpload?: FormData
}
