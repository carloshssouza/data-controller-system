import { createOptions, generateHeaders, requestAPI } from '../axios'

export const createApi = async (data: any, selectRequestType: any) => {
  data.requestType = selectRequestType
  const headers = generateHeaders()
  const options = createOptions({method: 'POST', url:'/api-info', headers, data})

  return requestAPI(options)
}

export const updateApi = async (data: any, selectedRecord: any) => {
  const headers = generateHeaders()
  const options = createOptions({method: 'PUT', url:`/api-info/${selectedRecord._id}`, headers, data})

  return requestAPI(options)
}

export const deleteApi = async (id: string) => {
  const headers = generateHeaders()
  const options = createOptions({method: 'DELETE', url: `/api-info/${id}`, headers})

  return requestAPI(options)
}

export const getAllApis = async () => {
  const headers = generateHeaders()
  const options = createOptions({method: 'GET', url: '/api-info', headers})

  return requestAPI(options)
}

export const getApiByName = async (name: string) => {
  const headers = generateHeaders()
  const options = createOptions({method: 'GET', url: `/api-info/${name}`, headers})

  return requestAPI(options)
}

export const onChangeUpdateDataReturnAllowed = async (dataReturnAllowed: boolean, _id: any) => {
  const headers = generateHeaders()
  const options = createOptions({method: 'PUT', url:`/api-info/${_id}`, headers, data: { dataReturnAllowed }})

  return requestAPI(options)
}