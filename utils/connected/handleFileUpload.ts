export function handleFileUpload(
  event: Event,
  mainImage: any,
  mainImageToUpload: any
) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const formData = new FormData()
  formData.append('file', file)
  mainImageToUpload.value = formData
  const reader = new FileReader()
  reader.onload = () => {
    const image = new Image()
    image.onload = () => {
      mainImage.value = reader.result as string
    }
    image.src = reader.result as string
  }
  reader.readAsDataURL(file)
}
