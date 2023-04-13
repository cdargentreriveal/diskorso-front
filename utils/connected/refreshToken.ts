export async function refreshToken(baseUrl: string) {
  if (process.client) {
    const xsrfToken = localStorage.getItem('xsrfToken')

    await localStorage.removeItem('xsrfToken')
    const request = await fetch(`${baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${xsrfToken}`,
      },
      credentials: 'include',
    })
    const response = await request.json()
    const xsrfTokenExpiration =
      Date.now() + parseInt(response.data.accessTokenExpiresIn)
    await localStorage.setItem('xsrfToken', response.data.xsrfToken)
    await localStorage.setItem('xsrfToken_time', xsrfTokenExpiration.toString())
    localStorage.getItem('xsrfToken')
  }
}
