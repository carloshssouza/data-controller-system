import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import io from "socket.io-client"
import { Button, Card, Form, Input } from 'antd';
import { ApiContainer, ApiSearchContainer, CardItem, CardValue, DataApi, LabelApi } from './styles';
import { getApiById } from '../../api/services/Api';

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

  const notifyError = (message: string) => toast.error(message);

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
    for(const error of errorLog) {
      if(error.routeId === apiId) {
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

  return (
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

      <div>
        <h1>Error logs</h1>
        <div>
          <div>quantidade de vazamentos</div>
          <div>api mais vazada</div>
          <div>dados mais vazado</div>
        </div>
        <div>
          <div>Grafico de vazamento, linha do tempo todas as apis</div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
