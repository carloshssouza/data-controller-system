import api from "../axios"

export const getErrorLogs = async (filter: string) => {
  console.log("filter", filter)
  try {
    const config = {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    const response = await api.get(`${import.meta.env.VITE_BASE_URL}/error-log?${filter}`, config)
    console.log("response", response.data)
    return response.data
  } catch (error: any) {
    if (error.response.status === 401) {
      return {
        error: true,
        message: error.response.data.message,
        status: error.response.status
      }
    }
    return {
      error: true,
      data: error.response.data,
      status: error.response.status
    }
  }
} 