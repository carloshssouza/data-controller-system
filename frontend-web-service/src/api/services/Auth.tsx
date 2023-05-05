import api from "../axios"

export const login = async (loginData: any) => {
  try {
    const response = await api.post(`${import.meta.env.VITE_BASE_URL}/login`, loginData)
    return response.data
  } catch (error: any) {
    return {
      error: true,
      message: error.response.data.message,
      status: error.response.status
    }
  }
}

export const logout = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    const response = await api.post(`${import.meta.env.VITE_BASE_URL}/logout`, {}, config)
    return response.data
  } catch (error: any) {
    if (error.response.status === 401) {
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

export const validateToken = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    const response = await api.post(`${import.meta.env.VITE_BASE_URL}/validate-token`, {}, config)
    return response.data
  } catch (error: any) {
    return {
      error: true,
      message: error.response.data.message,
      status: error.response.status
    }
  }
}