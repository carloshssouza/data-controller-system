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

export const updateUser = async (data: IUser) => {
  const headers = generateHeaders()
  const options = createOptions({
    method: 'PUT',
    url: `/user/${data._id}`,
    data,
    headers
  })

  return requestAPI(options)
}

export const getAllUsers = async () => {
  const headers = generateHeaders()
  const options = createOptions({
    method: 'GET',
    url: '/user',
    headers
  })

  return requestAPI(options)
}

export const deleteUser = async (_id: string) => {
  const headers = generateHeaders()
  const options = createOptions({
    method: 'DELETE',
    url: `/user/${_id}`,
    headers
  })

  return requestAPI(options)
}