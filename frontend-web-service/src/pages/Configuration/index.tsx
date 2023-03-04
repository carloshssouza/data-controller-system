import React, { useContext, useEffect, useState } from 'react'
import api from '../../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import ConfigurationContext from '../../context/Configuration/ConfigurationContext';
import { Form, Input } from 'antd';

export default function Configuration() {
  const notifySuccess = (message: string) => toast.success(message)
  const notifyError = (message: string) => toast.error(message);
  const {configuration, setConfiguration} = useContext(ConfigurationContext)

  const getConfiguration = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }

      const response = await api.get(`${import.meta.env.BASE_URL}/configuration`, config)

      if(response.status !== 200) {
        throw new Error(response.data.message)
      } else {
        notifySuccess(response.data.message)
        setConfiguration(response.data)
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  useEffect(() => {
   
    getConfiguration()
  }, [])

  return (
    <div>
      <div>
        <h1>Configuration</h1>
        <div>{configuration.mongoUriHost}</div>
        <div>{configuration.applicationHost}</div>
      </div>
      <ToastContainer />
    </div>
  )
}
