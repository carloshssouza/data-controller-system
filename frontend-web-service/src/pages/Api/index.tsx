import React, { useState, useEffect, useCallback } from 'react'
import api from '../../api/axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Input from '../../components/Input'

export default function Api() {
  const [listApisData, setListApisData] = useState([])
  const [apiDataForm, setApiDataForm] = useState({
    routeName: '',
    endpointPath: '',
    typeRequest: '',
    dataReturnAllowed: false
  })

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);  

  const getAllApis = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/api-info`, config)
      if(response.status !== 200) {
        throw new Error('Error getting all apis')
      } else{
        setListApisData(response.data)
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  const createApi = async (data: any) => {
    try {
      const config = {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.post(`${import.meta.env.VITE_BASE_URL}/api-info`, data, config)
      if(response.status !== 200) {
        throw new Error('Update api failed')
      } else{
        notifySuccess("Api created")
        await getAllApis()
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  const updateApi = async (id: string, data: any) => {
    try {
      const config = {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/${id}`, data)
      if(response.status !== 200) {
        throw new Error('Update api failed')
      } else {
        notifySuccess("Api updated")
        await getAllApis()
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  const deleteApi = async (id: string) => {
    try {
      const config = {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/api/${id}`, config)
      if(response.status !== 200) {
        throw new Error('Deleted api failed')
      } else {
        notifySuccess("Api deleted")
        await getAllApis()
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  return (
    <div>
      <div>Adicionar APIs</div>
      <div>
        <button onClick={createApi}>Salvar</button>
      </div>
      <ToastContainer/>
    </div>
  )
}
