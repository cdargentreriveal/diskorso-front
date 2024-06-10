export function getDate(dateToConverte: string | Date) {
  const date = new Date(dateToConverte)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const formattedDate = day + '/' + month + '/' + year
  return formattedDate
}
