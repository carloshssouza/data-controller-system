import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import io from "socket.io-client"
import { Button, Form, Input } from 'antd';
import { ApiContainer } from './styles';
import { getApiById } from '../../api/services/Api';


export default function Dashboard() {
  const [listApiData, setListApiData] = useState([])
  const [errorLog, setErrorLog] = useState([])

  const notifyError = (message: string) => toast.error(message);
  
  const getAllApis = async () => {
    try {
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/api-info`)
      if(response.status !== 200) {
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
      if(response.status !== 200) {
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
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/error-logs`)
      if(response.status !== 200) {
        throw new Error('Error getting all error logs')
      } else {
        setListApiData(response.data)
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  useEffect(() => {
    const socket = io('http://localhost:8000')
    socket.on('error-log-data', (data) => {
      setErrorLog(JSON.parse(data))
    });
  }, [])

  return (
    <>
      <ApiContainer>
        <h1>APIs</h1>
        <div>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={getApiByName}
          >
            <Form.Item>
              <Input placeholder='Search for Api'/>
              <Button type="primary">Search</Button>
            </Form.Item>
          </Form>
          <div>
            
          </div>
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
