import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { login } from '../../../../api/services/Auth'
import { Response } from '../../../../api/axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface LoginFormComponentProps {
  onClickRegister: () => void
}

export default function LoginFormComponent({ onClickRegister }: LoginFormComponentProps) {
  const navigate = useNavigate()
  const notifyError = (message: string) => toast.error(message);

  const handleLoginData = async (loginData: any) => {
    const { response, error } = await login(loginData) as Response

    if (error) {
      notifyError(response.data.message)
    } else {
      localStorage.setItem('token', response.data.access_token)
      navigate("/dashboard")
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
        label={<label style={{ color: 'white' }}>Email</label>}
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        label={<label style={{ color: 'white' }}>Password</label>}
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
        <Button style={{ marginLeft: "1rem" }} onClick={onClickRegister}>
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}
