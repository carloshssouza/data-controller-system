import api from '../axios'

interface ILogin {
  email: string
  password: string
}

export const loginAuthUser = async (data: ILogin) => {
  try {
    const response = await api.post(`${import.meta.env.BASE_URL}/login`, data)
    if(response.status !== 200) {
      throw new Error('Update api failed')
    } else{
      return response.data
    }
  } catch (error: any) {
    return error.response
  }
}

