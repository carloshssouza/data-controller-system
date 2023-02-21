import { Button, Form, Input, Spin } from 'antd'
import React from 'react'
import { ConfigurationContainer } from './styles'

interface ConfigurationFormComponentProps {
  onChangeMongoUri: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClickCheckMongo: () => void
  isLoading: boolean
}

export default function ConfigurationFormComponent({ onChangeMongoUri, onClickCheckMongo, isLoading }: ConfigurationFormComponentProps) {
  return (
    <ConfigurationContainer>
      <h1>Add your configuration</h1>
      <Form>
        <Form.Item
          label={<label style={{ color: 'white' }}>Mongodb Host:</label>}
          name="mongoUriHost"
          rules={[{ required: true, message: 'Mongodb host is required' }]}
        >
          <Input onChange={onChangeMongoUri} disabled={isLoading}/>
        </Form.Item>
        <Button onClick={onClickCheckMongo} disabled={isLoading}>{isLoading ? <Spin /> :  'Confirm'}</Button>
      </Form>
    </ConfigurationContainer>
  )
}
