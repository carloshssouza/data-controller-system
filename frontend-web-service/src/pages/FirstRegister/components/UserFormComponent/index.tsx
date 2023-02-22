import React from 'react'
import { UserContainer } from './styles'
import { Button, Form, Input, Spin } from 'antd'


interface UserFormComponentProps {
  handleRegisterUser: (data: any) => void
  isLoading: boolean
}

export default function UserFormComponent({ handleRegisterUser, isLoading }: UserFormComponentProps) {
  return (
    <UserContainer>
      <h2>Register your first admin user</h2>
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
        <Button disabled={isLoading} htmlType='submit'>{isLoading ? <Spin/> : 'Confirm'}</Button>
      </Form>
    </UserContainer>
  )
}
