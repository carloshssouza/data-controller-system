import { Button, Checkbox, Input, Select, Form } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { IApi } from '../../../../interfaces/Api/interfaces'
import { createApi } from '../../../../api/services/Api'
import { Response } from '../../../../api/axios'
import { toast } from 'react-toastify'

interface FormAddApiComponent {
  getAllApis: () => Promise<void>
}

const requestType = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

export default function FormAddApiComponent({ getAllApis }: FormAddApiComponent) {
  const [selectRequestType, setSelectRequestType] = useState<string>(requestType[0])
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const [form] = Form.useForm();


  const handleCreateApi = async (data: IApi) => {
    const { response, error } = await createApi(data, selectRequestType) as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.data.message)
      form.resetFields()
      setSelectRequestType(requestType[0])
      await getAllApis()
    }
  }

  const handleChangeRequestType = useCallback((requestType: string) => {
    setSelectRequestType(requestType)
  }, [])


  return (
    <div>
          <Form
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={handleCreateApi}
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
              initialValue={selectRequestType}
              rules={[{ required: true, message: 'Request type is required' }]}
            >
              
              <Select
                defaultValue={selectRequestType}
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
              initialValue={false}
              style={{ marginRight: "2rem" }}
            >
              <Checkbox style={{color: "white"}}>Return personal and sensible data</Checkbox>
            </Form.Item>
            <Button type="primary"  htmlType="submit">Add</Button>
          </Form>
        </div>
  )
}
