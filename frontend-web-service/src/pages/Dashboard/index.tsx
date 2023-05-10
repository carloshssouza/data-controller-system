import React, { useEffect, useRef, useState } from 'react'
import api from '../../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import io from "socket.io-client"
import { Button, Card, Form, Input, Radio, Spin, Tooltip } from 'antd';

import {
  ApiContainer,
  ApiSearchContainer,
  CardItem,
  CardValue,
  CommonErrorContainer,
  DashboardContainer,
  DataApi, ErrorCard,
  ErrorContainer, ErrorData,
  ErrorLogCard, GraphContainer,
  LabelApi,
} from './styles';
import { Container } from '../../GlobalStyles';
import { Navigate, useNavigate } from 'react-router-dom';
import ApisBarChart from './Charts/ApisBarChart'
import LogsComponent from './components/LogsComponent/LogsComponent';
import ErrorLogLineChart from './Charts/ErrorLogLineChart';
import { FilterOutlined } from '@ant-design/icons';
import FilterComponent, { IErrorFilter } from './components/FilterComponent/FilterComponent';
import { getErrorLogs } from '../../api/services/Dashboard';
import NotFoundComponent from '../../utils/NotFoundComponent/NotFoundComponent';

export interface IErrorLog {
  _id: string
  title: string
  description: string
  endpointPath: string
  routeName: string
  routeId: string
  leakedData: string
  level: string
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [listApiData, setListApiData] = useState<any[]>([])
  const [errorLog, setErrorLog] = useState<IErrorLog[]>([])
  const [extraInfo, setExtraInfo] =  useState({
    total: 0,
    mostLeakedDataName: '-',
    mostLeakedRouteName: '-',
    amountPerLevel: {
      low: 0,
      medium: 0,
      high: 0
    }
  })
  const chartRef = useRef<any>(null);
  const realTimeContainerRef = useRef<any>(null);

  const [chartWidth, setChartWidth] = useState(0);
  const [realTimeContainerWidth, setRealTimeContainerWidth] = useState(0);
  const [cardFilter, setCardFilter] = useState(false);
  const [filter, setFilter] = useState<IErrorFilter>({
    dateTime: '30m',
    routeName: '',
    routeId: '',
    level: ['low', 'medium', 'high']
  })

  const notifyError = (message: string) => toast.error(message);

  const handleResize = () => {
    if (chartRef.current) {
      setChartWidth(chartRef.current.clientWidth);
    }

    if (realTimeContainerRef.current) {
      setRealTimeContainerWidth(realTimeContainerRef.current.clientWidth);
    }
  };

  const showCardFilter = () => {
    setCardFilter(!cardFilter)
  }

  const getExtraInfos = async () => {
    try {
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/error-log-extra-infos`)
      console.log(response.data)
      if (response.status !== 200) {
        throw new Error('Error getting extra infos')
      } else {
        setExtraInfo(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAllApis = async () => {
    try {
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/api-info`)
      if (response.status !== 200) {
        throw new Error('Error getting all apis')
      } else {
        setListApiData(response.data)
      }
    } catch (error: any) {
      notifyError(error.response.data.message)
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    }
  }


  const getApiByName = async (name: string) => {
    try {
      const response = await api.get(`${import.meta.env.BASE_URL}/api-info/${name}`)
      if (response.status !== 200) {
        throw new Error(response.data.message)
      }
      else {
        return response.data
      }

    } catch (error: any) {
      console.error(error);
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.message)
    }
  }

  const getAllErrorLogs = async () => {
    try {
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/error-log?dateTime=30d`)
      if (response.status !== 200) {
        throw new Error('Error getting all error logs')
      } else {
        setErrorLog(response.data)
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.response.data.message)
    }
  }

  const handleQuantityApiErrors = (apiId: string) => {
    //I have the list of errors, i need to count the quantity of errors by api
    let apiErrors = 0
    for (const error of errorLog) {
      if (error.routeId === apiId) {
        apiErrors++
      }
    }

    return apiErrors
  }

  const getApiWithMoreLeakedData = () => {
    let apiWithMoreLeakedData = {
      name: '',
      leakedData: 0
    }

    for (const api of listApiData) {
      let leakedData = 0
      for (const error of errorLog) {
        if (error.routeId === api._id) {
          leakedData++
        }
      }
      if (leakedData > apiWithMoreLeakedData.leakedData) {
        apiWithMoreLeakedData.name = api.routeName
        apiWithMoreLeakedData.leakedData = leakedData
      }
    }

    return (
      <div>
        {
          apiWithMoreLeakedData.leakedData === 0 ? <div>No data leaked</div> : <div>{apiWithMoreLeakedData.name} : {apiWithMoreLeakedData.leakedData}</div>
        }

      </div>
    )
  }

  const getAmountErrorPerLevel = () => {
  
    return (
      <div>
        <div style={{ color: '#F05D5D' }}>High: {extraInfo.amountPerLevel.high}</div>
        <div style={{ color: '#FFD81D' }}>Medium: {extraInfo.amountPerLevel.medium}</div>
        <div style={{ color: '#7EED79' }}>Low: {extraInfo.amountPerLevel.low}</div>
      </div>
    )
  }

  const handleGetErrorLogs = async () => {
    const query = `dateTime=${filter.dateTime}&level=${filter.level.join(',')}${filter.routeName ? `&routeName=${filter.routeName}` : ''}${filter.routeId ? `&routeId=${filter.routeId}` : ''}`
    const response = await getErrorLogs(query)
    if (response.error) {
      if (response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(response.message)
    } else {
      setErrorLog(response)
    }

  }

  useEffect(() => {
    const socket = io('http://localhost:8000')
    getAllApis()
    handleResize()
    socket.on('message', (message) => {
    });
    socket.on('error-log-data', (data) => {
      handleGetErrorLogs()
      getExtraInfos()
    });
    if (errorLog.length === 0) {
      handleGetErrorLogs()
      getExtraInfos()
    }

  }, [])

  return (
    <Container>
      {
        isLoading ? (
          <Container>
            <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />
          </Container>
        ) : (
          <DashboardContainer>
            <ApiContainer>
              <h1>APIs</h1>
              <ApiSearchContainer>
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={getApiByName}
                >
                  <Form.Item>
                    <Input placeholder='Search for Api' />
                    <Button type="primary">Search</Button>
                  </Form.Item>
                </Form>
              </ApiSearchContainer>
              <div>
                {listApiData.length ? listApiData.map((api: any) => {
                  return (
                    <CardItem>
                      <div>
                        <CardValue>
                          <LabelApi>Route name: </LabelApi>
                          <DataApi>{api.routeName}</DataApi>
                        </CardValue>
                        <CardValue>
                          <LabelApi>Endpoint path: </LabelApi>
                          <DataApi>{api.endpointPath}</DataApi>
                        </CardValue>
                        <CardValue>
                          <LabelApi>Request type: </LabelApi>
                          <DataApi methodColor={api.requestType}>{api.requestType}</DataApi>
                        </CardValue>
                        <CardValue>
                          <LabelApi>Data return allowed: </LabelApi>
                          <DataApi>{api.dataReturnAllowed ? 'Yes' : 'No'}</DataApi>
                        </CardValue>                                                
                        <CardValue>
                          <LabelApi>Errors: </LabelApi>
                          <DataApi>{errorLog.length ? handleQuantityApiErrors(api._id) : api.amountErrors}</DataApi>
                        </CardValue>                          
                      </div>
                    </CardItem>
                  )
                }) : <h3>APIs not found or not exist</h3>}
              </div>
            </ApiContainer>

            <ErrorContainer>
              <h1>Error Logs</h1>
              <ErrorData>
                <ErrorCard>
                  <div>{extraInfo.total}</div>
                  <h4>Total Leak Errors</h4>
                </ErrorCard>
                <ErrorCard>
                  {extraInfo.mostLeakedRouteName}
                  <h4>Most leaked api</h4>
                </ErrorCard>
                <ErrorCard>
                  <div>{extraInfo.mostLeakedDataName}</div>
                  <h4>Most leaked data</h4>
                </ErrorCard>
                <ErrorCard>
                  {getAmountErrorPerLevel()}
                  <h4>Error per level</h4>
                </ErrorCard>
              </ErrorData>
              <GraphContainer ref={chartRef} >
                <CommonErrorContainer ref={realTimeContainerRef} style={{ maxWidth: "100%" }}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <h2>Errors</h2>
                    <Button type="primary" style={{ fontWeight: 'bold', marginLeft: '1rem' }} onClick={showCardFilter}>
                      Filters
                      <FilterOutlined />
                    </Button>
                    {
                      cardFilter && (
                        <FilterComponent handleGetErrorLogs={handleGetErrorLogs} filter={filter} setFilter={setFilter} />
                      )
                    }
                  </div>

                  {
                    (errorLog && errorLog.length) ? (
                      <ErrorLogLineChart errorLog={errorLog} />
                    ) : <NotFoundComponent />
                  }

                  <h3>Logs</h3>
                  {
                    errorLog.length ? <LogsComponent logs={errorLog} /> : <NotFoundComponent />
                  }
                </CommonErrorContainer>
                <CommonErrorContainer>
                  <h2>Api Errors Comparison</h2>
                  {
                    errorLog.length ? <ApisBarChart errorLog={errorLog} handleQuantityApiErrors={handleQuantityApiErrors} chartWidth={chartWidth} /> : <NotFoundComponent />
                  }
                </CommonErrorContainer>
              </GraphContainer>
            </ErrorContainer>
          </DashboardContainer>
        )
      }
      <ToastContainer toastStyle={{ backgroundColor: "black", color: "white" }} />
    </Container>
  )
}
