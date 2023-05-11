import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import api from '../../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import io from "socket.io-client"
import { Button, Spin } from 'antd';

import {
  CommonErrorContainer,
  DashboardContainer,
  ErrorCard,
  ErrorContainer, ErrorData,
  GraphContainer,
} from './styles';

import { Container } from '../../GlobalStyles';
import { useNavigate } from 'react-router-dom';
import ApisBarChart from './Charts/ApisBarChart'
import LogsComponent from './components/LogsComponent/LogsComponent';
import ErrorLogLineChart from './Charts/ErrorLogLineChart';
import { FilterOutlined } from '@ant-design/icons';
import FilterComponent from './components/FilterComponent/FilterComponent';
import { getErrorLogs } from '../../api/services/Dashboard';
import NotFoundComponent from '../../utils/NotFoundComponent/NotFoundComponent';
import ApisComponent from './components/ApisComponent/ApisComponent';
import FilterButtonComponent from './components/FilterButtonComponent/FilterButtonComponent';

interface ILeakedData {
  name: string
  type: string
}
export interface IErrorLog {
  _id: string
  title: string
  description: string
  endpointPath: string
  routeName: string
  routeId: string
  leakedData: ILeakedData[]
  level: string
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errorLog, setErrorLog] = useState<IErrorLog[]>([])
  const [errorLogSorted, setErrorLogSorted] = useState<IErrorLog[]>([])
  const [extraInfo, setExtraInfo] = useState({
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
    setCardFilter(prev => !prev);
  }


  const getExtraInfos = async () => {
    try {
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/error-log-extra-infos`)
      if (response.status !== 200) {
        throw new Error('Error getting extra infos')
      } else {
        setExtraInfo(response.data)
      }
    } catch (error) {
      console.log(error)
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

  const getAmountErrorPerLevel = () => {

    return (
      <div>
        <div style={{ color: '#F05D5D' }}>High: {extraInfo.amountPerLevel.high}</div>
        <div style={{ color: '#FFD81D' }}>Medium: {extraInfo.amountPerLevel.medium}</div>
        <div style={{ color: '#7EED79' }}>Low: {extraInfo.amountPerLevel.low}</div>
      </div>
    )
  }

  const handleGetErrorLogsFilter = async (filter: any) => {
    console.log({filter})
    const query = `dateTime=${filter.dateTime}&level=${filter.level.join(',')}${filter.routeName ? `&routeName=${filter.routeName}` : ''}${filter.routeId ? `&routeId=${filter.routeId}` : ''}`
    const { response } = await getErrorLogs(query) as any
    setErrorLog(response.data)
  }

  const handleGetErrorLogs = async () => {
    const query = `dateTime=30m&level=low,medium,high`
    const response = await getErrorLogs(query) as any
    setErrorLog(response.data || [])
  }


  useEffect(() => {
    setIsLoading(true)
    const socket = io('http://localhost:8000')
    handleResize()
    socket.on('message', (message) => {
    });
    socket.on('error-log-data', (data) => {
      handleGetErrorLogs()
      getExtraInfos()
    });
    if (errorLog?.length === 0) {
      handleGetErrorLogs()
      getExtraInfos()
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    console.log({errorLog})
  }, [errorLog])


  return (
    <Container>
      {
        isLoading ? (
          <Container>
            <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />
          </Container>
        ) : (
          <DashboardContainer>
            <ApisComponent />

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
                  <FilterButtonComponent handleGetErrorLogsFilter={handleGetErrorLogsFilter}/>
                  {
                    (errorLog && errorLog?.length) ? (
                      <ErrorLogLineChart errorLog={errorLog} />
                    ) : <NotFoundComponent />
                  }
                  <h3>Logs</h3>
                  {
                    errorLog && errorLog?.length ? <LogsComponent logs={errorLog} /> : <NotFoundComponent />
                  }
                </CommonErrorContainer>
                <CommonErrorContainer>
                  <h2>Api Errors Comparison</h2>
                  {
                    errorLog?.length ? <ApisBarChart errorLog={errorLog} handleQuantityApiErrors={handleQuantityApiErrors} chartWidth={chartWidth} /> : <NotFoundComponent />
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
