import React, { useState } from 'react'
import api from '../../api/axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function ErrorLogData() {

  const [listErrorLogData, setListErrorLogData] = useState([])
  const [errorLogData, setErrorLogData] = useState({})
  const [errorLogLeakedData, setErrorLogLeakedData] = useState({})

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const getErrorLog = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/error-log`, config)

      if (response.status !== 200) {
        throw new Error('Error getting error log data')
      } else {
        setErrorLogData(response.data)
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  const getAllErrorLogs = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/error-log/all`, config)
      if (response.status !== 200) {
        throw new Error('Error getting all error logs')
      }
    } catch (error: any) {
      notifySuccess(error.message)
    }
  }

  // const updateErrorLog = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem('token')}`
  //       }
  //     }
  //     const response = await api.put(`${import.meta.env.VITE_BASE_URL}/error-log`, config)
  //     if (response.status !== 200) {
  //       throw new Error('Error updating error log')
  //     } else {
  //       notifySuccess('Error log updated')
  //     }
  //   } catch (error: any) {
  //     notifyError(error.message)
  //   }
  // }

  const deleteErrorLog = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }

      const response = await api.delete(`${import.meta.env.VITE_BASE_URL}/error-log`, config)

      if (response.status !== 200) {
        throw new Error('Error deleting error log')
      } else {
        notifySuccess('Error log deleted')
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  const getErrorLogLeakedData = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/error-log/leaked-data`)
      if (response.status !== 200) {
        throw new Error('Error getting error log leaked data')
      } else {
        setErrorLogData(response.data)
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  const getErrorLogLeakedDataByApiId = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }

      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/error-log/leaked-data/api-id`, config)

      if(response.status !== 200) {
        throw new Error('Error getting error log leaked data by api id')
      } else {
        setErrorLogLeakedData(response.data)
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  const getErrorDynamicFilter = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/error-log/dynamic-filter`, config)

      if(response.status !== 200) {
        throw new Error('Error getting error log dynamic filter')
      } else {
        setErrorLogLeakedData(response.data)
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  return (
    <div>

      <ToastContainer />
    </div>

  )
}
