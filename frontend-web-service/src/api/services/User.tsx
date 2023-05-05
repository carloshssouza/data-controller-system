import api from "../axios"

export const getUser = async () => {
  try {
    const config = {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    const response = await api.get(`${import.meta.env.VITE_BASE_URL}/user/me`, config)
    return response.data
  } catch (error: any) {
    if(error.response.status === 401) {
      localStorage.removeItem('token')
      return {
        error: true,
        message: error.response.data.message,
        status: error.response.status
      }
    }
    return {
      error: true,
      message: error.response.data.message,
      status: error.response.status
    }
  }
}