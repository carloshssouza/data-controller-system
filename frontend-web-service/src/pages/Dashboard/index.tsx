import React, { useEffect, useRef, useState } from 'react'
import api from '../../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import io from "socket.io-client"
import { Button, Card, Form, Input, Spin, Tooltip } from 'antd';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip as Tooltip2, Legend } from 'recharts';

import {
  ApiContainer,
  ApiSearchContainer,
  CardItem,
  CardValue,
  CommonErrorContainer,
  DataApi, ErrorCard,
  ErrorContainer, ErrorData,
  ErrorLogCard, GraphContainer,
  LabelApi,
} from './styles';
import { Container } from '../../GlobalStyles';
import { Navigate, useNavigate } from 'react-router-dom';
import ApisLineChart from './Charts/ApisLineChart';
import ApisBarChart from './Charts/ApisBarChart'

interface IErrorLog {
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
  const chartRef = useRef<any>(null);
  const realTimeContainerRef = useRef<any>(null);

  const [chartWidth, setChartWidth] = useState(0);
  const [realTimeContainerWidth, setRealTimeContainerWidth] = useState(0);
  const notifySuccess = (message: string) => toast.success(message)
  const notifyError = (message: string) => toast.error(message);

  const handleResize = () => {
    if (chartRef.current) {
      setChartWidth(chartRef.current.clientWidth);
    }

    if (realTimeContainerRef.current) {
      setRealTimeContainerWidth(realTimeContainerRef.current.clientWidth);
    }
  };

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
    }
  }


  const getApiByName = async (name: string) => {
    try {
      const response = await api.get(`${import.meta.env.BASE_URL}/api-info/${name}`)
      if (response.status !== 200) {
        throw new Error('Error getting api by id')
      }
      else {
        return response.data
      }

    } catch (error: any) {
      console.error(error);
      return error.response
    }
  }

  const getAllErrorLogs = async () => {
    try {
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/error-log`)
      if (response.status !== 200) {
        throw new Error('Error getting all error logs')
      } else {
        setErrorLog(response.data)
      }
    } catch (error: any) {
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

  useEffect(() => {
    const socket = io('http://localhost:8000')
    getAllApis()
    handleResize()
    socket.on('message', (message) => {
      console.log(message)
    });
    socket.on('error-log-data', (data) => {
      setErrorLog((prevState) => [...prevState, data])
      getAllErrorLogs()
    });
    if (errorLog.length === 0) {
      getAllErrorLogs()
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
          <>
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
                          <DataApi>{handleQuantityApiErrors(api._id)}</DataApi>
                        </CardValue>
                      </div>
                    </CardItem>
                  )
                }) : <h1>no data</h1>}
              </div>
            </ApiContainer>

            <ErrorContainer>
              <h1>Error Logs</h1>
              <ErrorData>
                <ErrorCard>
                  <div>{errorLog.length}</div>
                  <h4>Total Leak Errors</h4>
                </ErrorCard>
                <ErrorCard>
                  <div>Get users</div> //handleMostLeakedApi
                  <h4>Most leaked api</h4>
                </ErrorCard>
                <ErrorCard>
                  <div>Email</div> //handleMostLeakedDatas
                  <h4>Most leaked data</h4>
                </ErrorCard>
                <ErrorCard>
                  <div>
                    <div>Alto: 0</div>
                    <div>Medio: 3</div>
                    <div>Baixo: 0</div>
                  </div>
                  <h4>Quantidade por níveis</h4>
                </ErrorCard>
              </ErrorData>
              <GraphContainer ref={chartRef} >
                <CommonErrorContainer ref={realTimeContainerRef} style={{ maxWidth: "100%" }}>
                  <h2>Apis error lines</h2>
                  <ApisLineChart errorLog={errorLog} />

                  <h3>Logs</h3>
                  <ErrorLogCard>
                    <div>{JSON.stringify(errorLog[0])}</div>

                  </ErrorLogCard>
                </CommonErrorContainer>
                <CommonErrorContainer>
                  <h2>Api Errors Comparison</h2>
                  <ApisBarChart errorLog={errorLog} handleQuantityApiErrors={handleQuantityApiErrors} chartWidth={chartWidth}/>
                  
                </CommonErrorContainer>
              </GraphContainer>
            </ErrorContainer>
          </>
        )
      }
      <ToastContainer toastStyle={{ backgroundColor: "black", color: "white" }} />
    </Container>
  )
}
