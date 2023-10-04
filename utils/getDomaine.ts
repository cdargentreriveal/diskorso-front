export function getDomain(urlToConvert: string) {
  let domain = ''
  if (urlToConvert) {
    try {
      domain = new URL(urlToConvert).hostname
    } catch (error) {
      // Une erreur s'est produite lors de la création de l'URL, utilisez donc mainImageSource directement
      domain = urlToConvert
    }
  } else {
    urlToConvert = ''
  }
  return domain
}
