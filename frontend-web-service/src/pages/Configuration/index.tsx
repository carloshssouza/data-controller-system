import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../GlobalStyles';
import { ConfigurationContainer, ConfigurationContainerRestrict } from './styles';
import StartProxyButton from './components/StartProxyButton';
import MongoItem from './components/MongoItem';
import ApplicationHostItem from './components/ApplicationHostItem';
import RestrictDataItem from './components/RestrictDataItem';
import { checkApplicationHost, checkProxyServer, deleteApplicationHost, deleteMongoDatabaseConnection, getConfiguration, getRestrictData, startProxyServer, stopProxyServer, updateConfiguration } from '../../api/services/Configuration';
import { logout } from '../../api/services/Auth';
import StopProxyButton from './components/StopProxyButton';
import { Response } from '../../api/axios';


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
  const notifyError = (message: string) => toast.error(message);
  const notifySuccess = (message: string) => toast.success(message)

  const [isProxyStarted, setIsProxyStarted] = useState(false);
  const [isApplicationHostStarted, setIsApplicationHostStarted] = useState(false);
  const [configuration, setConfiguration] = useState<IConfiguration>({})
  const [restrictDataList, setRestrictDataList] = useState<IRestrictDataList>({
    personal: [],
    sensible: []
  })
  const [isStartLoading, setIsStartLoading] = useState(false)
  const [isStopLoading, setIsStopLoading] = useState(false)
  const [isTestLoading, setIsTestLoading] = useState(false)

  const handleGetConfiguration = async () => {
    const { response, error } = await getConfiguration() as Response
    if (error) {
      if (response.status === 404 || !response.data?.connection) {
        localStorage.removeItem('dbConnection')
        navigate('/')
      }
    } else {
      setConfiguration(response.data)
    }
  }



  const handleLogoutUser = async () => {
    const { response, error } = await logout() as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      localStorage.removeItem('token')
      navigate('/login')
    }
  }

  const handleUpdateConfiguration = async (data: any) => {
    const { response, error } = await updateConfiguration(data) as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.data.message)
      setTimeout(() => {
        handleLogoutUser()
      }, 3000)
    }
  }

  const handleDeleteMongoDatabaseConnection = async () => {
    const { response, error } = await deleteMongoDatabaseConnection() as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.data.message)
      setTimeout(() => {
        handleLogoutUser()
      }, 3000)
    }
  }


  const handleDeleteApplicationHost = async () => {
    const { response, error } = await deleteApplicationHost() as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.data.message)
      localStorage.removeItem('connection')
      handleLogoutUser()
    }
  }

  const handleStartProxyServer = async () => {
    setIsStartLoading(true)
    const { response, error } = await startProxyServer() as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.data.message)
      setIsProxyStarted(true)
    }
    setIsStartLoading(false)
  }

  const handleStopProxyServer = async () => {
    setIsStopLoading(true)
    const { response, error } = await stopProxyServer() as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.data.message)
      setIsProxyStarted(false)
    }
    setIsStopLoading(false)
  }

  const handleCheckProxyServer = async () => {
    const { response, error } = await checkProxyServer() as Response
    if (!error) {
      notifySuccess(response.data.message)
      setIsProxyStarted(response.data.isProxyStarted)
    }
  }

  const handleCheckApplicationHost = async () => {
    setIsTestLoading(true)
    const { response, error } = await checkApplicationHost(configuration) as Response
    if (error) {
      notifyError(response.message)
      setIsApplicationHostStarted(false)
    } else {
      notifySuccess(response.data.message)
      setIsApplicationHostStarted(true)
    }
    setIsTestLoading(false)
  }

  useEffect(() => {
    handleGetConfiguration()
    handleCheckProxyServer()
  }, [])

  return (
    <Container>
      <ConfigurationContainer>
        <MongoItem
          configuration={configuration}
          deleteMongoDatabaseConnection={handleDeleteMongoDatabaseConnection}
        />
        <ApplicationHostItem
          configuration={configuration}
          deleteApplicationHost={handleDeleteApplicationHost}
          checkApplicationHost={handleCheckApplicationHost}
          updateConfiguration={handleUpdateConfiguration}
          isTestLoading={isTestLoading}
        />
        <div>
          <StartProxyButton
            isLoading={isStartLoading}
            isProxyStarted={isProxyStarted}
            isApplicationHostStarted={isApplicationHostStarted}
            startProxy={handleStartProxyServer}
          />
          <StopProxyButton
            isLoading={isStopLoading}
            isProxyStarted={isProxyStarted}
            stopProxy={handleStopProxyServer}
          />
        </div>

        {
          !isApplicationHostStarted && !isStopLoading && !isStartLoading && !isProxyStarted && (
            <div style={{ marginBottom: "1rem" }}>You need test the application host connection first</div>
          )
        }
      </ConfigurationContainer>

      <ConfigurationContainerRestrict>
        <RestrictDataItem />
      </ConfigurationContainerRestrict>
    </Container>
  )
}
