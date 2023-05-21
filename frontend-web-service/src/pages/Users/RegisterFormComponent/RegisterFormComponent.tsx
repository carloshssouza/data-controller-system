import { Button, Form, Input, Select, Spin } from 'antd'
import { useCallback, useState } from 'react'
import { registerUser } from '../../../api/services/User'
import { toast } from 'react-toastify';
import { Response } from '../../../api/axios';

interface RegisterFormComponentProps {
  handleGetAllUsers: () => Promise<void>
}

const userTypeList = ['user', 'admin']

export default function RegisterFormComponent({ handleGetAllUsers }: RegisterFormComponentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState(userTypeList[0])
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const handleRegisterUser = async (data: any) => {
    setIsLoading(true)
    const { response, error } = await registerUser(data) as Response

    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess("User created")
      handleGetAllUsers()
    }
    setIsLoading(false)
  }

  const onChangeRequestType = useCallback((userType: string) => {
    setUserType(userType)
  }, [])

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
        <Input placeholder='User Name' disabled={isLoading} />
      </Form.Item>
      <Form.Item
        name="accountName"
        rules={[{ required: true, message: 'Account name is required', whitespace: false }]}
      >
        <Input type='text' placeholder='Account name' disabled={isLoading} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Password is required' }]}
      >
        <Input.Password placeholder='Password' />
      </Form.Item>
      <Form.Item>
        <Select
          defaultValue={userType}
          style={{ width: 150 }}
          onChange={onChangeRequestType}
          options={userTypeList.map((type: string) => {
            return {
              label: type,
              value: type
            }
          })}
        />
      </Form.Item>
      <Button type="primary" disabled={isLoading} htmlType='submit'>{isLoading ? <Spin /> : 'Confirm'}</Button>
    </Form>
  )
}
