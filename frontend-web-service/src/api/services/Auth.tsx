import { createOptions, generateHeaders, requestAPI } from "../axios"

export const login = async (loginData: any) => {
  const options = createOptions({
    method: 'POST',
    url: '/login',
    data: loginData
  })

  return requestAPI(options)
}

export const logout = async () => {
  const headers = generateHeaders()
  const options = createOptions({
    method: 'POST',
    url: '/logout',
    headers,
  })

  return requestAPI(options)
}

export const validateToken = async () => {
  const headers = generateHeaders()
  const options = createOptions({
    method: 'POST',
    url: '/validate-token',
    headers,
  })

  return requestAPI(options)
}