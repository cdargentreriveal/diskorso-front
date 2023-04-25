export function searchByTagConnected(tag: string, locate: string) {
  if (tag !== '') {
    if (locate === 'mes-promenades') {
      return navigateTo(`/dashboard/mes-promenades/search/${tag}`)
    } else {
      return navigateTo(`/dashboard/mes-extraits/search/${tag}`)
    }
  }
}
