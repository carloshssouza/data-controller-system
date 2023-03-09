import api from '../axios'

const createApi = async (data: any) => {
    try {
      const response = await api.post(`${import.meta.env.VITE_BASE_URL}/api-info`, data)
      if(response.status !== 200) {
        throw new Error('Update api failed')
      } else{
        return response.data
      }
    } catch (error: any) {
      return error.response
    }
  }

  const getAllApis = async () => {
    try {
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/api-info`)
      
      if(response.status !== 200) {
        throw new Error('Error getting api by id')
      } else {
        return response.data
      }
    } catch (error: any) {
      console.error(error);
      return error.response 
    }
  };

  const getApiById = async (id: string) => {
    try {
      const response = await api.get(`${import.meta.env.BASE_URL}/api-info/${id}`)
      if(response.status !== 200) {
        throw new Error('Error getting api by id')
      }
      else {
        return response.data
      }
      
    } catch (error: any) {
      console.error(error);
      return error.response
    }
  }

  const updateApi = async (id: string, data: any) => {
    try {
      const response = await api.put(`${import.meta.env.BASE_URL}/api-info/${id}`, data)
      if(response.status !== 200) {
        throw new Error('Update api failed')
      } else{
        return response.data
      }
    } catch (error: any) {
      return error.response
    }
  }

  const deleteApi = async (id: string) => {
    try {
      const response = await api.delete(`${import.meta.env.BASE_URL}/api-info/${id}`)
      if(response.status !== 200) {
        throw new Error('Update api failed')
      } else{
        return response.data
      }
    } catch (error: any) {
      return error.response
    }
  }

export { createApi, getAllApis, getApiById, updateApi, deleteApi }