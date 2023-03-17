import React from 'react'
import { UserContainer } from './styles'
import { Button, Form, Input, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'

interface UserFormComponentProps {
  handleRegisterUser: (data: any) => void
  isLoading: boolean
}

export default function UserFormComponent({ handleRegisterUser, isLoading }: UserFormComponentProps) {
  const navigate = useNavigate()

  const onClickAlreadyHaveUser = () => {
    navigate("/register-host")
  }

  return (
    <UserContainer>
      <h2>Register your admin user</h2>
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
          <Input placeholder='Name' disabled={isLoading}/>
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Email is required' }]}
        >
          <Input type='email' placeholder='Email' disabled={isLoading}/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Password is required' }]}
        >
          <Input.Password placeholder='Password' />
        </Form.Item>
        <Button style={{background: '#65BA74', color: 'white'}}disabled={isLoading} htmlType='submit'>{isLoading ? <Spin/> : 'Confirm'}</Button>
        <Button type="default" onClick={onClickAlreadyHaveUser} >Already have a user</Button>
      </Form>
    </UserContainer>
  )
}
