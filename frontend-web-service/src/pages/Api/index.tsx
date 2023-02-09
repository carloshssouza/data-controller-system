import React, { useState, useEffect, useCallback } from 'react'
import {
  getAllApis,
  getApiById,
  updateApi,
  deleteApi,
  createApi,
} from '../../api/services/Api'
import api from '../../api/axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export default function Api() {
  const [apisData, setApisData] = useState([])
  const [apiData, setApiData] = useState({})
  const [success, setSuccess] = useState(false)
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);  

  const handleAllApis = async () => {
    try {
      const response = await getAllApis()
      if(response.status !== 200) {
        throw new Error('Update api failed')
      } else{
        setApisData(response.data)
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  const handleCreateApi = async (data: any) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.post(`${import.meta.env.VITE_BASE_URL}/api`, data, config)
      if(response.status !== 200) {
        throw new Error('Update api failed')
      } else{
        notifySuccess("Api created")
        await handleAllApis()
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  const handleUpdateApi = useCallback(async (id: string, data: any) => {
    try {
      const response = await updateApi(id, data)
      if(response.status !== 200) {
        throw new Error('Update api failed')
      } else {
        notifySuccess("Api updated")
        await handleAllApis()
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }, [])

  const handleDeleteApi = async (id: string) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/${id}`)
      if(response.status !== 200) {
        throw new Error('Deleted api failed')
      } else {
        notifySuccess("Api deleted")
        await handleAllApis()
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  return (
    <div>
      <div>Informações das APIs</div>
      <div>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <button onClick={handleCreateApi}>Salvar</button>
      </div>
      <ToastContainer/>
    </div>
  )
}
