import React, { useEffect, useRef, useState } from 'react'
import api from '../../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import io from "socket.io-client"
import { Button, Card, Form, Input, Tooltip } from 'antd';
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
import { getApiById } from '../../api/services/Api';
import ErrorLogData from '../Error';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Container } from '../../GlobalStyles';

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
  const [listApiData, setListApiData] = useState([])
  const [errorLog, setErrorLog] = useState<IErrorLog[]>([])
  const [data, setData] = useState<any[]>([]);
  const chartRef = useRef<any>(null);
  const realTimeContainerRef = useRef<any>(null);

  const [chartWidth, setChartWidth] = useState(0);
  const [realTimeContainerWidth, setRealTimeContainerWidth] = useState(0);
  const newData = [
    { timestamp: '2023-02-17T12:00:00.000Z', value: 10 },
    { timestamp: '2023-02-17T12:01:00.000Z', value: 20 },
    { timestamp: '2023-02-17T12:02:00.000Z', value: 15 },
    { timestamp: '2023-02-17T12:03:00.000Z', value: 10 }
  ];

  const notifyError = (message: string) => toast.error(message);

  const handleResize = () => {
    if (chartRef.current) {
      setChartWidth(chartRef.current.clientWidth);
    }

    if(realTimeContainerRef.current) {
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
      notifyError(error.message)
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
      notifyError(error.message)
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
    socket.on('error-log-data', (data) => {
      setErrorLog(JSON.parse(data))
    });
  }, [])

  useEffect(() => {
    getAllApis()
    getAllErrorLogs()
  }, [])

 
  useEffect(() => {
    const timer = setInterval(() => {
      // Your logic to fetch and update the data goes here
      // Append the new data or the last known value if there is no new data
      setData(prevData => {
        const newData = [...prevData];
        const lastData = prevData[prevData.length - 1];
        const nextTimestamp = lastData ? new Date(lastData.timestamp).getTime() + 60000 : Date.now();
        newData.push(newData.length > 0 ? { timestamp: nextTimestamp, value: newData[newData.length - 1].value } : { timestamp: nextTimestamp, value: 0 });
        return newData;
      });
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    handleResize()
  }, [])

  useEffect(() => {
    console.log(chartWidth)
  }, [chartRef])
  


  return (
    <Container>
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
            <div>0</div>
            <h4>Total Leak Errors</h4>
          </ErrorCard>
          <ErrorCard>
            <div>Get users</div>
            <h4>Most leaked api</h4>
          </ErrorCard>
          <ErrorCard>
            <div>Email</div>
            <h4>Most leaked data</h4>
          </ErrorCard>
        </ErrorData>
        <GraphContainer ref={chartRef} >
          <CommonErrorContainer  ref={realTimeContainerRef} style={{maxWidth: "100%"}}>
            <h2>Real Time errors</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                <Tooltip />
                <Legend />
             </LineChart>
            </ResponsiveContainer>

            <h3>Logs</h3>
            <ErrorLogCard>
              <div>{JSON.stringify(errorLog[0])}</div>
              <div>{JSON.stringify(errorLog[1])}</div>
              <div>{JSON.stringify(errorLog[3])}</div>
              <div>{JSON.stringify(errorLog[0])}</div>
              <div>{JSON.stringify(errorLog[0])}</div>
            </ErrorLogCard>
          </CommonErrorContainer>
        
        
          <CommonErrorContainer>
            <h2>Api Errors Comparison</h2>
            
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                <Tooltip />
                <Legend />
             </LineChart>
            </ResponsiveContainer>
          </CommonErrorContainer>
          
        </GraphContainer>
      </ErrorContainer>
      <ToastContainer />
    </Container>
  )
}
