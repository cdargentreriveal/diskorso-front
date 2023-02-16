export function searchByTag(tag: string) {
  if (tag !== '') {
    return navigateTo(`/promenades/search/${tag}`)
  }
}
