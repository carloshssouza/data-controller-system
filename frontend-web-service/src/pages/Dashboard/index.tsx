import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import io from "socket.io-client"
import { Button, Spin } from 'antd';
import ErrorExtraInfoComponent from './components/ErrorExtraInfoComponent/ErrorExtraInfoComponent';

import {
  CommonErrorContainer,
  DashboardContainer,
  ErrorContainer,
  GraphContainer,
} from './styles';

import { Container } from '../../GlobalStyles';
import { useNavigate } from 'react-router-dom';
import ApisBarChart from './Charts/ApisBarChart'
import LogsComponent from './components/LogsComponent/LogsComponent';
import ErrorLogLineChart from './Charts/ErrorLogLineChart';
import { getAllErrorLogs, getExtraInfos } from '../../api/services/Dashboard';
import NotFoundComponent from '../../utils/NotFoundComponent/NotFoundComponent';
import ApisComponent from './components/ApisComponent/ApisComponent';
import FilterButtonComponent from './components/FilterButtonComponent/FilterButtonComponent';
import { Response } from '../../api/axios';
import { IErrorExtraInfo } from '../../interfaces/ErrorLog/interfaces';
import { IErrorLog } from '../../interfaces/ErrorLog/interfaces';

export default function Dashboard() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorLog, setErrorLog] = useState<IErrorLog[]>([])
  const [extraInfo, setExtraInfo] = useState<IErrorExtraInfo>({
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

  const notifyError = (message: string) => toast.error(message);

  const handleResize = () => {
    if (chartRef.current) {
      setChartWidth(chartRef.current.clientWidth);
    }

    if (realTimeContainerRef.current) {
      setRealTimeContainerWidth(realTimeContainerRef.current.clientWidth);
    }
  };

  const handleGetExtraInfos = async () => {
    const { response, error } = await getExtraInfos() as Response
    if (error) {
      notifyError(response.message)
    } else {
      setExtraInfo(response.data)
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

  const handleGetErrorLogsFilter = async (filter: any) => {
    const query = `dateTime=${filter.dateTime}&level=${filter.level.join(',')}${filter.routeName ? `&routeName=${filter.routeName}` : ''}${filter.routeId ? `&routeId=${filter.routeId}` : ''}`
    const { response, error } = await getAllErrorLogs(query) as Response
    if (error) {
      notifyError(response.message)
    } else {
      setErrorLog(response.data || [])
    }
  }

  const handleGetErrorLogs = async () => {
    const query = `dateTime=30m&level=low,medium,high`
    const { response, error } = await getAllErrorLogs(query) as Response
    if (error) {
      notifyError(response.message)
    } else {
      setErrorLog(response.data || [])
    }
  }

  useEffect(() => {
    setIsLoading(true)
    const socket = io(import.meta.env.VITE_BASE_URL_SOCKET as string)
    handleResize()
    socket.on('message', (message) => {
      console.log({ message })
    });
    socket.on('error-log-data', (data) => {
      console.log({data})
      handleGetErrorLogs()
      handleGetExtraInfos()
    });
    if (errorLog?.length === 0) {
      handleGetErrorLogs()
      handleGetExtraInfos()
    }
    setIsLoading(false)
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
            <ApisComponent errorLog={errorLog}/>

            <ErrorContainer>
              <h1>Error Logs</h1>
              <ErrorExtraInfoComponent extraInfo={extraInfo} />
              <GraphContainer ref={chartRef} >
                <CommonErrorContainer ref={realTimeContainerRef} style={{ maxWidth: "100%" }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h2>Errors</h2>
                    <FilterButtonComponent handleGetErrorLogsFilter={handleGetErrorLogsFilter} />
                  </div>
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
