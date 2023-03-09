import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { RegisterAppContainer } from './styles'
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import api from '../../api/axios';

export default function RegisterApp() {
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleAppHostData = async (data: any) => {
    try {
      setIsLoading(true)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.put(`${import.meta.env.VITE_BASE_URL}/configuration`, data, config)
      if (response.status !== 200) {
        throw new Error(response.data.message)
      } else {
        notifySuccess(response.data.message)
        navigate("/dashboard")
      }
    } catch (error: any) {
      notifyError(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <RegisterAppContainer>
      <div>
      <h1>Register your target application host</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleAppHostData}
          autoComplete="off"
        >
          <Form.Item
            label={<label style={{ color: 'white' }}>Application Host</label>}
            name="applicationHost"
            rules={[{ required: true, message: 'Application host is required' }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Confirm
          </Button>
        </Form>
      </div>     
      <ToastContainer toastStyle={{ backgroundColor: "black", color: "white" }}/>
    </RegisterAppContainer>
  )
}
