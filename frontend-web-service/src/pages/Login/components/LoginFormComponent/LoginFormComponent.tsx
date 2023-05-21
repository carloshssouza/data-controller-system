import { Button, Form, Input } from 'antd'
import { login } from '../../../../api/services/Auth'
import { Response } from '../../../../api/axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../../api/services/User';

export default function LoginFormComponent() {
  const navigate = useNavigate()
  const notifyError = (message: string) => toast.error(message);

  const handleLoginData = async (loginData: any) => {
    const { response, error } = await login(loginData) as Response

    if (error) {
      notifyError(response.data.message)
    } else {
      localStorage.setItem('token', response.data.access_token)
      const responseUser = await getUser() as Response
      if(responseUser.error) {
        notifyError(responseUser.response.data.message)
        return
      } else {
        localStorage.setItem('type', responseUser.response.data.type)
        navigate("/dashboard")
      }
    }
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={handleLoginData}
      autoComplete="off"
    >
      <Form.Item
        label={<label style={{ color: 'white' }}>Account name</label>}
        name="accountName"
        rules={[{ required: true, message: 'Please, input your account name' }]}
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item
        label={<label style={{ color: 'white' }}>Password</label>}
        name="password"
        rules={[{ required: true, message: 'Please, input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}
