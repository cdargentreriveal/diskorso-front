const config = useRuntimeConfig()

export async function refreshToken() {
  const xsrfToken = localStorage.getItem('xsrfToken')
  await localStorage.removeItem('xsrfToken')
  const request = await fetch(`${config.public.baseURL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${xsrfToken}`,
    },
    credentials: 'include',
  })
  const response = await request.json()
  await localStorage.setItem('xsrfToken', response.data.xsrfToken)
  localStorage.getItem('xsrfToken')
}
