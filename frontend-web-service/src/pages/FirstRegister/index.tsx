import React, { useCallback, useEffect, useState } from 'react'
import { RegisterContainer } from './styles'
import { Response } from '../../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import ConfigurationFormComponent from './components/ConfigurationFormComponent';
import UserFormComponent from './components/UserFormComponent';
import { Container } from '../../GlobalStyles';
import { Spin } from 'antd';
import { IUser } from '../../interfaces/User/interfaces';
import { registerUser } from '../../api/services/User';
import { checkMongo, checkMongoConnection } from '../../api/services/Configuration';

export default function Register() {
  const [registerUserAllowed, setRegisterUserAllowed] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const navigate = useNavigate()

  const handleCheckMongo = async (data: any) => {
    const { response, error } = await checkMongo(data) as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.data.message)
      setRegisterUserAllowed(true)
    }
  }

  const handleRegisterUser = async (data: IUser) => {
    data.type = 'admin'
    const { response, error } = await registerUser(data) as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.data.message)
      navigate("/register-host")
    }
  }

  const handleCheckMongoConnection = async () => {
    const { response, error } = await checkMongoConnection() as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.data.message)
      navigate("/login")
    }
  }

  useEffect(() => {
    handleCheckMongoConnection()
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
        <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: '100vh' }}>
          <Spin size="large" />
        </div>

      )}
      <ToastContainer toastStyle={{ backgroundColor: "black", color: "white" }} />
    </Container>

  )
}
