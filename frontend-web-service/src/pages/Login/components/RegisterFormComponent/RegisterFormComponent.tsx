import { Button, Form, Input, Spin } from 'antd'
import { useState } from 'react'
import { registerUser } from '../../../../api/services/User'
import { toast } from 'react-toastify';
import { Response } from '../../../../api/axios';

interface RegisterFormComponentProps {
  onClickBack: () => void
}

export default function RegisterFormComponent({ onClickBack }: RegisterFormComponentProps) {
  const  [isLoading, setIsLoading] = useState(false)
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const handleRegisterUser = async(data: any) => {
    setIsLoading(true)
    const { response, error } = await registerUser(data) as Response

    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess("User created")
      onClickBack()
    }
    setIsLoading(false)
  }

  return (
    <Form
    name="basic"
    initialValues={{ remember: true }}
    onFinish={handleRegisterUser}
    autoComplete="off"
  >
    <Form.Item
      name="name"
      rules={[{ required: true, message: 'Name is required' }]}
    >
      <Input placeholder='Name' disabled={isLoading} />
    </Form.Item>
    <Form.Item
      name="email"
      rules={[{ required: true, message: 'Email is required' }]}
    >
      <Input type='email' placeholder='Email' disabled={isLoading} />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[{ required: true, message: 'Password is required' }]}
    >
      <Input.Password placeholder='Password' />
    </Form.Item>
    <Button style={{ background: '#65BA74', color: '#fff' }} disabled={isLoading} htmlType='submit'>{isLoading ? <Spin /> : 'Confirm'}</Button>
    <Button type="default" onClick={onClickBack} >Already have a user</Button>
  </Form>
  )
}
