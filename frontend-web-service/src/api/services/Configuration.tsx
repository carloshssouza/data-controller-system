import api from "../axios"


export const getConfiguration = async () => {
  try {
    const config = {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    const response = await api.get(`${import.meta.env.VITE_BASE_URL}/configuration`, config)
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

export const getRestrictData = async (dataType?: string) => {
  try {
    const config = {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    const response = await api.get(`${import.meta.env.VITE_BASE_URL}/configuration/restrict-data${dataType ? `?dataType=${dataType}` : ''}`, config)
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

export const updateConfiguration = async (data: any) => {
  try {
    const config = {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    const response = await api.put(`${import.meta.env.VITE_BASE_URL}/configuration`, data, config)
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

export const deleteMongoDatabaseConnection = async () => {
  try {
    const config = {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    const response = await api.delete(`${import.meta.env.VITE_BASE_URL}/configuration/mongo-host`, config)
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

export const deleteApplicationHost = async () => {
  try {
    const config = {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    const response = await api.delete(`${import.meta.env.VITE_BASE_URL}/configuration/application-host`, config)
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

export const startProxyServer = async () => {
  try {
    const config = {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    await api.get(`${import.meta.env.VITE_BASE_URL}/configuration/start-proxy`, config)
    return {
      error: false
    }
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

export const stopProxyServer = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    const response = await api.get(`${import.meta.env.VITE_BASE_URL}/configuration/stop-proxy`, config)
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

export const checkProxyServer = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    const response = await api.get(`${import.meta.env.VITE_BASE_URL}/configuration/check-proxy`, config)
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

export const checkApplicationHost = async (configuration: any) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    const response = await api.get(`${import.meta.env.VITE_BASE_URL}/configuration/check-application-host?applicationUrl=${configuration?.applicationHost}`, config)
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

export const addRestrictData = async (data: any, dataType: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    const response = await api.post(`${import.meta.env.VITE_BASE_URL}/configuration/restrict-data?dataType=${dataType}`, data, config)
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

export const deleteRestrictData = async (name: string, dataType: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    const response = await api.delete(`${import.meta.env.VITE_BASE_URL}/configuration/restrict-data?dataType=${dataType}&dataName=${name}`, config)
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

export const updateAppHost = async (data: any) => {
  try {
   
    const response = await api.put(`${import.meta.env.VITE_BASE_URL}/configuration/application-host`, data)
    return response.data
  } catch (error: any) {
    return {
      error: true,
      message: error.response.data.message,
      status: error.response.status
    }
  }
}