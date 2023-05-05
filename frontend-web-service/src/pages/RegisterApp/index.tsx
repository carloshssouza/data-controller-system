import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { RegisterAppContainer } from './styles'
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { getConfiguration, updateAppHost } from '../../api/services/Configuration';

export default function RegisterApp() {
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleAppHostData = async (data: any) => {
    setIsLoading(true)

    const response = await updateAppHost(data)

    if (response.error) {
      notifyError(response.message)
    } else {
      notifySuccess(response.message)
      navigate("/dashboard")
    }
    setIsLoading(false)
  }

  const handleGetConfiguration = async () => {
    const response = await getConfiguration()
    if(response.error) {
      if(response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      if(response.status === 404 || !response.data?.connection) {
        localStorage.removeItem('dbConnection')
        navigate('/')
      }
      notifyError(response.data.message)
    } else {
      if (response.applicationHost) {
        navigate('/login')
      }
    }
  }

  useEffect(() => {
    handleGetConfiguration()
  }, [])

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
      <ToastContainer toastStyle={{ backgroundColor: "black", color: "white" }} />
    </RegisterAppContainer>
  )
}
