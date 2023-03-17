import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import { toast, ToastContainer } from 'react-toastify'
import { Container } from '../../GlobalStyles'
import { UserContainer } from './styles'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

interface IUserData {
  name?: string
  email?: string
}


export default function User() {
  const [userData, setUserData] = useState<IUserData>({})
  const notifyError = (message: string) => toast.error(message);
  const navigate = useNavigate()

  const getUserData = async() => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/user/me`, config)
      if(response.status !== 200) {
        throw new Error(response.data.message)
      } else {
        setUserData(response.data)
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.message)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])
  

  return (
    <Container>
      <UserContainer>
      <h1>My account</h1>
      <div>
      <div>{userData.name}</div>
      <div>{userData.email}</div>
      </div>
      <Button>
        Editar
      </Button>
      </UserContainer>
      <ToastContainer />
    </Container>
  )
}
