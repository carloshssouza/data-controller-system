import React, { useCallback, useEffect, useState } from 'react'
import { RegisterContainer } from './styles'
import api from '../../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import ConfigurationFormComponent from './components/ConfigurationFormComponent';
import UserFormComponent from './components/UserFormComponent';
import { Container } from '../../GlobalStyles';
import { Spin } from 'antd';

export default function Register() {
  const [registerUserAllowed, setRegisterUserAllowed] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const navigate = useNavigate()

  const handleCheckMongo = async (data: any) => {
    try {
      setIsLoading(true)
      const response = await api.post(`${import.meta.env.VITE_BASE_URL}/configuration/mongo-host`, data)
      if (response.status !== 201) {
        throw new Error('Create api failed')
      } else {
        notifySuccess(response.data.message)
        setRegisterUserAllowed(true)
      }
    } catch (error: any) {
      notifyError(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterUser = async (data: any) => {
    try {
      setIsLoading(true)
      data.type = 'admin'
      const response = await api.post(`${import.meta.env.VITE_BASE_URL}/user`, data)
      if (response.status !== 201) {
        throw new Error('Create user failed')
      } else {
        notifySuccess(response.data.message)
        navigate("/register-host")
      }
    } catch (error: any) {
      notifyError(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }
  
  const checkMongoConnection = async () => {
    try {
      setIsLoading(true)
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/configuration/db-connection`, config)
      if (response.status !== 200) {
        throw new Error(response.data.message)
      } else {
        notifySuccess(response.data.message)
        navigate('/login')
      }
    } catch (error: any) {
      notifyError(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkMongoConnection()
  }, [])

  return (
    <Container>
      {!isLoading ? (
        <RegisterContainer>
        <div>
          {
            !registerUserAllowed && (
              <ConfigurationFormComponent handleCheckMongo={handleCheckMongo} isLoading={isLoading} />
            )
          }
          {
            registerUserAllowed && (
              <UserFormComponent handleRegisterUser={handleRegisterUser} isLoading={isLoading} />
            )
          }
        </div>
      </RegisterContainer>
      ) : (
        <div style={{display:'flex', justifyContent: "center", alignItems: 'center', height: '100vh'}}>
          <Spin size="large" />
        </div>
        
      )}
      <ToastContainer toastStyle={{ backgroundColor: "black", color: "white" }}/>
    </Container>

  )
}
