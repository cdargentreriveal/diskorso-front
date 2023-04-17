export function searchByTagConnected(tag: string) {
  if (tag !== '') {
    return navigateTo(`/dashboard/mes-promenades/search/${tag}`)
  }
}
