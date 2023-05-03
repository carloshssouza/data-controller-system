import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../GlobalStyles';
import { ConfigurationContainer, ConfigurationContainerRestrict} from './styles';
import ProxyButton from './components/ProxyButton';
import MongoItem from './components/MongoItem';
import ApplicationHostItem from './components/ApplicationHostItem';
import RestrictDataItem from './components/RestrictDataItem';
 

interface IRestrictDataList {
  personal: []
  sensible: []
}

interface IConfiguration {
  mongoUriHost?: string
  applicationHost?: string
  restrictDataList?: IRestrictDataList
}


export default function Configuration() {
  const navigate = useNavigate()
  const notifyError = (message: string) => toast.error(message);
  const notifySuccess = (message: string) => toast.success(message)

  const [isProxyStarted, setIsProxyStarted] = useState(false);
  const [isApplicationHostStarted, setIsApplicationHostStarted] = useState(false);
  const [configuration, setConfiguration] = useState<IConfiguration>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isTestLoading, setIsTestLoading] = useState(false)

  const getConfiguration = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }

      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/configuration`, config)

      if (response.status !== 200) {
        throw new Error(response.data.message)
      } else {
        setConfiguration(response.data)
      }
    } catch (error: any) {
      console.log(error)
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      if(error.response.status === 404 || !error.response.data.connection) {
        localStorage.removeItem('dbConnection')
        navigate('/')
      }
      notifyError(error.message)
    }
  }

  const logoutUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.post(`${import.meta.env.VITE_BASE_URL}/logout`, config)
      if (response.status !== 200) {
        throw new Error('Logout failed')
      } else {
        localStorage.removeItem('token')
        navigate('/login')
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.message)
    }
  }

  const updateConfiguration = async (data: any) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.put(`${import.meta.env.VITE_BASE_URL}/configuration`, data, config)
      if (response.status !== 200) {
        throw new Error(response.data.message)
      } else {
        notifySuccess(response.data.message)
        setTimeout(() => {
          logoutUser()
        }, 3000)
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.message)
    }
  }

  const deleteMongoDatabaseConnection = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.delete(`${import.meta.env.VITE_BASE_URL}/configuration/mongo-host`, config)
      if(response.status !== 200) {
        throw new Error(response.data.message)
      } else {
        notifySuccess(response.data.message)
        setTimeout(() => {
          logoutUser()
        }, 3000)
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.message)
    }
  }


  const deleteApplicationHost = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.delete(`${import.meta.env.VITE_BASE_URL}/configuration/application-host`, config)
      if(response.status !== 200) {
        throw new Error(response.data.message)
      } else {
        notifySuccess(response.data.message)
        getConfiguration()
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.message)
    }
  }

  const startProxyServer = async() => {
    try {
      setIsLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }

      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/configuration/start-proxy`, config)
      if(response.status !== 200) {
        throw new Error(response.data.message)
      } else {
        setIsProxyStarted(true)
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.response.data.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const stopProxyServer = async() => {
    try {
      setIsLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }

      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/configuration/stop-proxy`, config)
      if(response.status !== 200) {
        throw new Error(response.data.message)
      } else {
        notifySuccess(response.data.message)
        setIsProxyStarted(false)
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const checkProxyServer = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/configuration/check-proxy`, config)
      if(response.status !== 200) {
        throw new Error(response.data.message)
      } else { 
        notifySuccess(response.data.message)
        setIsProxyStarted(true)
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    } 
  }

  const checkApplicationHost = async () => {
    try {
      setIsTestLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }

      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/configuration/check-application-host?applicationUrl=${configuration?.applicationHost}`, config)
      if(response.status !== 200) {
        throw new Error(response.data.message)
      }
       else {
        notifySuccess(response.data.message)
        setIsApplicationHostStarted(true)
       }
    } catch (error: any) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.response.data.message)
      setIsApplicationHostStarted(false)
    } finally {
      setIsTestLoading(false)
    }
  }

  useEffect(() => {
    getConfiguration()
    checkProxyServer()
  }, [])

  return (
    <Container>
      <ConfigurationContainer>
        <MongoItem
          configuration={configuration}
          deleteMongoDatabaseConnection={deleteMongoDatabaseConnection}
        />
        <ApplicationHostItem 
          configuration={configuration} 
          deleteApplicationHost={deleteApplicationHost} 
          checkApplicationHost={checkApplicationHost}
          updateConfiguration={updateConfiguration}
          isTestLoading={isTestLoading}
        />
        <ProxyButton 
          onClick={!isProxyStarted ? startProxyServer : stopProxyServer} 
          isProxyStarted={isProxyStarted} 
          isApplicationHostStarted={isApplicationHostStarted}
          isLoading={isLoading}
        />
      </ConfigurationContainer>

      <ConfigurationContainerRestrict>
        <RestrictDataItem restrictDataPersonal={configuration?.restrictDataList?.personal || []} restrictDataSensible={configuration?.restrictDataList?.sensible || []}/>
      
        {
          !isApplicationHostStarted && !isLoading && (
            <div style={{marginBottom: "1rem"}}>You need test the application host connection first</div>
          )
        }
      </ConfigurationContainerRestrict>
    </Container>
  )
}
