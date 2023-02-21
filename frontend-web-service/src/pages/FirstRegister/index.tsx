import React, { useCallback, useEffect, useState } from 'react'
import { RegisterContainer } from './styles'
import api from '../../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import ConfigurationFormComponent from './components/ConfigurationFormComponent';
import UserFormComponent from './components/UserFormComponent';
import { Container } from '../../GlobalStyles';

export default function Register() {

  const [mongoUriHost, setMongoUriHost] = useState<string>('')
  const [registerUserAllowed, setRegisterUserAllowed] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const navigate = useNavigate()

  const onClickCheckMongo = async () => {
    try {
      setIsLoading(true)
      const response = await api.post(`${import.meta.env.VITE_BASE_URL}/configuration/mongo-host`, { mongoUriHost })
      if (response.status !== 201) {
        throw new Error('Create api failed')
      } else {
        notifySuccess(response.data.message)
        setRegisterUserAllowed(true)
      }
    } catch (error: any) {
      notifyError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const onChangeMongoUri = useCallback((e: any) => {
    setMongoUriHost(e.target.value)
  }, [])

  const handleRegisterUser = async (data: any) => {
    try {
      setIsLoading(true)
      data.type = 'admin'
      const response = await api.post(`${import.meta.env.VITE_BASE_URL}/user`, data)
      if (response.status !== 201) {
        throw new Error('Create user failed')
      } else {
        notifySuccess(response.data.message)
        navigate("/login")
      }
    } catch (error: any) {
      notifyError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <RegisterContainer>
        <div>
          {
            !registerUserAllowed && (
              <ConfigurationFormComponent onChangeMongoUri={onChangeMongoUri} onClickCheckMongo={onClickCheckMongo} isLoading={isLoading} />
            )
          }
          {
            registerUserAllowed && (
              <UserFormComponent handleRegisterUser={handleRegisterUser} isLoading={isLoading} />
            )
          }
        </div>
        <ToastContainer />
      </RegisterContainer>
    </Container>

  )
}
