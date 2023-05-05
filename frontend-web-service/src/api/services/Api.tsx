import api from '../axios'

export const createApi = async(data: any, selectRequestType: any) => {
  try {
    const config = {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    data.requestType = selectRequestType
    const response = await api.post(`${import.meta.env.VITE_BASE_URL}/api-info`, data, config)
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

export const updateApi = async (data: any, selectedRecord: any) => {
  try {
    const config = {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }

    const response = await api.put(`${import.meta.env.VITE_BASE_URL}/api/${selectedRecord._id}`, data, config)
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

export const deleteApi = async (id: string) => {
  try {
    const config = {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    const response = await api.delete(`${import.meta.env.VITE_BASE_URL}/api-info/${id}`, config)
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

export const getAllApis = async () => {
  try {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    const response = await api.get(`${import.meta.env.VITE_BASE_URL}/api-info`, config)
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

export const onChangeUpdateDataReturnAllowed = async (dataReturnAllowed: boolean, _id: any) => {
  try {
    const response = await api.put(`${import.meta.env.VITE_BASE_URL}/api-info/${_id}`, { dataReturnAllowed })
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