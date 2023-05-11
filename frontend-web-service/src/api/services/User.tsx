import { IUser } from "../../interfaces/User/interfaces"
import { createOptions, generateHeaders, requestAPI } from "../axios"

export const getUser = async () => {
  const headers = generateHeaders()
  const options = createOptions({
    method: 'GET',
    url: '/user/me',
    headers,
  })

  return requestAPI(options)
}

export const registerUser = async (data: IUser) => {
  const options = createOptions({
    method: 'POST',
    url: '/user',
    data
  })

  return requestAPI(options)
}