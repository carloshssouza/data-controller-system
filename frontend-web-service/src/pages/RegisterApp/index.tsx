import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { RegisterAppContainer } from './styles'
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { getConfiguration, updateAppHost } from '../../api/services/Configuration';
import { Response } from '../../api/axios';

export default function RegisterApp() {
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleAppHostData = async (data: any) => {
    setIsLoading(true)

    const {response, error} = await updateAppHost(data) as Response

    if (error) {
      notifyError(response.message)
    } else {
      notifySuccess(response.data.message)
      navigate("/login")
    }
    setIsLoading(false)
  }

  const handleGetConfiguration = async () => {
    const {response, error}= await getConfiguration() as Response
    if( error || (response.data?.connection && !response.data?.connection)) {
      if(response.status === 404) {
        localStorage.removeItem('dbConnection')
        navigate('/')
      }
      notifyError(response.message)
    } else {
      console.log('response.data.applicationHost', response.data.applicationHost)
      if (response.data.applicationHost) {
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
