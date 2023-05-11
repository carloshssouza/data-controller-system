import { requestAPI } from "../../pages/Dashboard/components/api"
import api from "../axios"

export const getErrorLogs = async (filter: string) => {
  console.log({filter})
  const options = {
    method: "GET",
    url: `/error-log?${filter}`,
  }
  
  return requestAPI(options)
} 