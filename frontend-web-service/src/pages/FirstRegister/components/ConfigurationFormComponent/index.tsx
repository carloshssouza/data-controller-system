import { Button, Form, Input, Spin } from 'antd'
import React from 'react'
import { ConfigurationContainer } from './styles'

interface ConfigurationFormComponentProps {
  handleCheckMongo: (data: any) => void
  isLoading: boolean
}

export default function ConfigurationFormComponent({ handleCheckMongo, isLoading }: ConfigurationFormComponentProps) {
  return (
    <ConfigurationContainer>
      <h1>Add your configuration</h1>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleCheckMongo}
        autoComplete="off"

      >
        <Form.Item
          label={<label style={{ color: 'white' }}>Mongodb Host:</label>}
          name="mongoUriHost"
          rules={[{ required: true, message: 'Mongodb host is required' }]}
        >
          <Input disabled={isLoading}/>
        </Form.Item>
        <Button disabled={isLoading} htmlType="submit">{isLoading ? <Spin /> :  'Confirm'}</Button>
      </Form>
    </ConfigurationContainer>
  )
}
