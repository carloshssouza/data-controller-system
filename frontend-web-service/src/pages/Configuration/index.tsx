import React, { useContext, useEffect, useState } from 'react'
import api from '../../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import ConfigurationContext from '../../context/Configuration/ConfigurationContext';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../GlobalStyles';
import { ConfigurationContainer, ConfigurationItem } from './styles';


const restrictDataList = {
  personal: [
    'name',
    'email'
  ],
  sensible: [
    'race',
    'religion'
  ]
}

interface IRestrictDataList {
  personal: string[]
  sensible: string[]
}

interface IConfiguration {
  mongoUriHost?: string
  applicationHost?: string
  restrictDataList?: IRestrictDataList
}

export default function Configuration() {
  const navigate = useNavigate()
  const notifySuccess = (message: string) => toast.success(message)
  const notifyError = (message: string) => toast.error(message);
  const [configuration, setConfiguration] = useState<IConfiguration>({})

  const getConfiguration = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }

      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/configuration`, config)

      if(response.status !== 200) {
        throw new Error(response.data.message)
      } else {
        setConfiguration(response.data)
      }
    } catch (error: any) {
      if(error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.message)
    }
  }

  useEffect(() => {
    getConfiguration()
  }, [])

  return (
    <Container>
      <ConfigurationContainer>
        <h1>Configuration</h1>
        <ConfigurationItem>
          <h3>Mongo Database Connection</h3>
          <div>
            <div>{configuration.mongoUriHost}</div>
          </div>
          <Button>Edit</Button>
        </ConfigurationItem>
        <div>
          <h3>Application host target</h3>
          <div>{configuration.applicationHost}</div>
        </div>
        <div>
          <h3>Restrict Data List</h3>
          <div>{restrictDataList.personal}</div>
          <div>{restrictDataList.sensible}</div>
        </div>
        <Button>Start proxy server</Button>
      </ConfigurationContainer>
      <ToastContainer />
    </Container>
  )
}
