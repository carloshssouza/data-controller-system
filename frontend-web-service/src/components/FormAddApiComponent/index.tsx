import React from 'react'
import { Button, Checkbox, Input, Modal, Select, Form } from 'antd'

interface FormAddApiComponent {
  createApi: (data: any) => Promise<void>,
  apiUpdateData: any,
  handleChangeRequestType: (data: any) => void,
  requestType: string[],
}

export default function FormAddApiComponent({ createApi, apiUpdateData, handleChangeRequestType, requestType }: FormAddApiComponent) {
  return (
    <div>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={createApi}
            autoComplete="off"
          >
            <Form.Item
              name="routeName"
              rules={[{ required: true, message: 'Route name is required' }]}
            >
              <Input placeholder="Route name" />
            </Form.Item>
            <Form.Item
              name="endpointPath"
              rules={[{ required: true, message: 'Endpoint path is required' }]}
            >
              <Input placeholder="Endpoint path" />
            </Form.Item>
            <Form.Item
              name="requestType"
              rules={[{ required: true, message: 'Request type is required' }]}
            >
              <Select
                defaultValue={apiUpdateData.requestType}
                style={{ width: 150 }}
                onChange={handleChangeRequestType}
                options={requestType.map((type: string) => {
                  return {
                    label: type,
                    value: type
                  }
                })}
              />
            </Form.Item>
            <Form.Item
              name="dataReturnAllowed"
              valuePropName="checked"
              style={{ marginRight: "2rem" }}
            >
              <Checkbox style={{color: "white"}}>Return personal and sensible data</Checkbox>
            </Form.Item>
            <Button type="primary"  htmlType="submit">Add</Button>
          </Form>
        </div>
  )
}
