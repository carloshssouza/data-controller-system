import { requestAPI } from "../../pages/Dashboard/components/api"
import { generateHeaders } from "../axios"

export const getAllErrorLogs = async (filter: string) => {
  const options = {
    method: "GET",
    url: `/error-log?${filter}`,
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
  const options = {
    method: "GET",
    url: "/api-info",
  }

  return requestAPI(options)
}

