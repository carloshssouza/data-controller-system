import { requestAPI } from "../axios"
import { generateHeaders } from "../axios"

export const getAllErrorLogs = async (filter: string) => {
  const headers = generateHeaders()
  const options = {
    method: "GET",
    url: `/error-log?${filter}`,
    headers
  }
  
  return requestAPI(options)
} 

export const getExtraInfos = async () => {
  const headers = generateHeaders()
  const options = {
    method: "GET",
    url: "/error-log-extra-infos",
    headers
  }

  return requestAPI(options)
}

export const getApis = async () => {
  const headers = generateHeaders()
  const options = {
    method: "GET",
    url: "/api-info",
    headers
  }

  return requestAPI(options)
}

