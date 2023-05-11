import { createOptions, generateHeaders, requestAPI } from "../axios"

export const getConfiguration = async () => {
  const headers = generateHeaders()
  const options = createOptions({
    method: 'GET',
    url: '/configuration',
    headers
  })

  return requestAPI(options)
}

export const getRestrictData = async (dataType?: string) => {
  const headers =  generateHeaders()
  console.log("generate", headers)
  const options = createOptions({
    method: 'GET', 
    url: `/configuration/restrict-data${dataType ? `?dataType=${dataType}` : ''}`, 
    headers
  })

  return requestAPI(options)
}

export const updateConfiguration = async (data: any) => {
  const headers = generateHeaders()
  const options = createOptions({
    method: 'PUT',
    url: '/configuration',
    headers,
    data
  })

  return requestAPI(options)
}

export const deleteMongoDatabaseConnection = async () => {
  const headers = generateHeaders()
  const options = createOptions({
    method: 'DELETE',
    url: '/configuration/mongo-host',
    headers
  })

  return requestAPI(options)
}

export const deleteApplicationHost = async () => {
  const headers = generateHeaders()
  const options = createOptions({
    method: 'DELETE',
    url: '/configuration/application-host',
    headers
  })

  return requestAPI(options)
}

export const startProxyServer = async () => {
  const headers = generateHeaders()
  const options = createOptions({
    method: 'POST',
    url: '/configuration/start-proxy',
    headers
  })

  return requestAPI(options)
}

export const stopProxyServer = async () => {
  const headers = generateHeaders()
  const options = createOptions({
    method: 'POST',
    url: '/configuration/stop-proxy',
    headers
  })

  return requestAPI(options)
}

export const checkProxyServer = async () => {
  const headers = generateHeaders()
  const options = createOptions({
    method: 'GET',
    url: '/configuration/check-proxy',
    headers
  })

  return requestAPI(options)
}

export const checkApplicationHost = async (configuration: any) => {
  const headers = generateHeaders()
  const options = createOptions({
    method: 'GET',
    url: `/configuration/check-application-host?applicationUrl=${configuration?.applicationHost}`,
    headers
  })

  return requestAPI(options)
}

export const addRestrictData = async (data: any, dataType: string) => {
  const headers = generateHeaders()
  const options = createOptions({
    method: 'POST',
    url: `/configuration/restrict-data?dataType=${dataType}`,
    headers,
    data
  })

  return requestAPI(options)
}

export const updateRestrictData = async (data: any, dataType: string) => {
  const headers = generateHeaders()
  const options = createOptions({
    method: 'PUT',
    url: `/configuration/restrict-data?dataType=${dataType}`,
    headers,
    data
  })

  return requestAPI(options)
}

export const deleteRestrictData = async (name: string, dataType: string) => {
  const headers = generateHeaders()
  const options = createOptions({
    method: 'DELETE',
    url: `/configuration/restrict-data?dataType=${dataType}&dataName=${name}`,
    headers
  })

  return requestAPI(options)
}

export const updateAppHost = async (data: any) => {
  const options = createOptions({
    method: 'PUT',
    url: '/configuration/application-host',
    data
  })

  return requestAPI(options)
}

export const checkMongo = async (data: any) => {
  const options = createOptions({
    method: 'POST',
    url: '/configuration/mongo-host',
    data
  })

  return requestAPI(options)
}

export const checkMongoConnection = async () => {
  const options = createOptions({
    method: 'GET',
    url: '/configuration/db-connection'
  })

  return requestAPI(options)
}