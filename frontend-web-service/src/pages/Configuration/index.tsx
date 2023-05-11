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
    const response = await getConfiguration()
    if (response.error) {
      if (response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      if (response.status === 404 || !response.data?.connection) {
        localStorage.removeItem('dbConnection')
        navigate('/')
      }
    } else {
      setConfiguration(response)
    }
  }

  const handleGetRestrictData = async (dataType?: string) => {
    const response = await getRestrictData(dataType)
    if (response.error) {
      if (response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(response.message)
    } else {
      if (dataType) {
        setRestrictDataList((prevState: IRestrictDataList) => ({
          ...prevState,
          [dataType]: response
        }))
      } else {
        setRestrictDataList(response)
      }
    }
  }

  const handleLogoutUser = async () => {
    const response = await logout()
    if (response.error) {
      if (response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(response.message)
    } else {
      localStorage.removeItem('token')
      navigate('/login')
    }
  }

  const handleUpdateConfiguration = async (data: any) => {
    const response = await updateConfiguration(data)
    if (response.error) {
      if (response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(response.message)
    } else {
      notifySuccess(response.message)
      setTimeout(() => {
        handleLogoutUser()
      }, 3000)
    }
  }

  const handleDeleteMongoDatabaseConnection = async () => {
    const response = await deleteMongoDatabaseConnection()
    if (response.error) {
      if (response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(response.message)
    } else {
      notifySuccess(response.data.message)
      setTimeout(() => {
        handleLogoutUser()
      }, 3000)
    }
  }


  const handleDeleteApplicationHost = async () => {
    const response = await deleteApplicationHost()
    if (response.error) {
      if (response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(response.message)
    } else {
      notifySuccess(response.data.message)
      localStorage.removeItem('connection')
      handleLogoutUser()
    }
  }

  const handleStartProxyServer = async () => {
    setIsStartLoading(true)
    const response = await startProxyServer()
    if (response.error) {
      if (response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(response.message)
    } else {
      notifySuccess(response.message)
      setIsProxyStarted(true)
    }
    setIsStartLoading(false)
  }

  const handleStopProxyServer = async () => {
    setIsStopLoading(true)
    const response = await stopProxyServer()
    if (response.error) {
      if (response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(response.message)
    } else {
      notifySuccess(response.message)
      setIsProxyStarted(false)
    }
    setIsStopLoading(false)
  }

  const handleCheckProxyServer = async () => {
    const response = await checkProxyServer()
    if (response.error) {
      if (response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    } else {
      notifySuccess(response.message)
      setIsProxyStarted(true)
    }
  }

  const handleCheckApplicationHost = async () => {
    setIsTestLoading(true)
    const response = await checkApplicationHost(configuration)
    if (response.error) {
      if (response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(response.message)
      setIsApplicationHostStarted(false)
    } else {
      notifySuccess(response.message)
      setIsApplicationHostStarted(true)
    }
    setIsTestLoading(false)
  }

  const convertData = (restrictDataType: string[], type: string) => {
    const data = []
    for (const item of restrictDataType) {
      data.push({ name: item, type })
    }

    return data
  }


  useEffect(() => {
    handleGetConfiguration()
    handleGetRestrictData()
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
        <RestrictDataItem
          restrictDataPersonal={restrictDataList?.personal ?
            convertData(restrictDataList?.personal, 'personal') : []
          }
          restrictDataSensible={restrictDataList?.sensible ?
            convertData(restrictDataList?.sensible, 'sensible') : []
          }

          getRestrictData={handleGetRestrictData}
        />
      </ConfigurationContainerRestrict>
    </Container>
  )
}
