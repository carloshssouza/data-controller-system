import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import io from "socket.io-client"


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
    socket.on('message', (data) => {
      console.log(data)
    });
  }, [])

  useEffect(() => {
    const socket = io('http://localhost:8000')
    socket.on('error-log-data', (data) => {
      setErrorLog(JSON.parse(data))
    });
  }, [])

  return (
    <>
      <div>
        <h1>APIs</h1>
        <div>
          <div>
            <input type="text" /> //search
            <button>Search</button>
          </div>
          <div>
            <div>
              <div>Api1</div> //cards
              <div>Api2</div>
            </div>
          </div>
        </div>
      </div>

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
