import { Button, Checkbox, Input, Modal, Select, Form } from 'antd'
import React, { useEffect, useState } from 'react'

interface ModalUpdateApiComponentProps {
  updateModalVisible: boolean,
  setUpdateModalVisible: (value: boolean) => void,
  updateApi: (data: any) => Promise<void>,
  selectedRecord: any,
  requestType: string[],
}

export default function ModalUpdateApiComponent({ 
  updateApi, 
  selectedRecord, 
  requestType,
  updateModalVisible,
  setUpdateModalVisible
}: ModalUpdateApiComponentProps) {

  return (
    <Modal
          title="Update Route"
          open={updateModalVisible}
          onCancel={() => setUpdateModalVisible(false)}
          cancelButtonProps={{style: {display: 'none'}}}
          okButtonProps={{ style: { display: 'none' } }}
        >
           <Form
            style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={updateApi}
            autoComplete="off"
          >
            <Form.Item
              key={selectedRecord?.routeName}
              label="Route Name"
              name="routeName"
              rules={[{ required: true, message: 'Route name is required' }]}
            >
              <Input defaultValue={selectedRecord?.routeName} key={selectedRecord?.routeName}/>
            </Form.Item>
            <Form.Item
              key={selectedRecord?.endpointPath}
              label="Endpoint Path"
              name="endpointPath"
              rules={[{ required: true, message: 'Endpoint path is required' }]}
            >
              <Input defaultValue={selectedRecord?.endpointPath} key={selectedRecord?.endpointPath} />
            </Form.Item>
            <Form.Item
              key={selectedRecord?.requestType}
              label="Request Type"
              name="requestType"
              rules={[{ required: true, message: 'Request type is required' }]}
            >
              <Select
                defaultValue={selectedRecord?.requestType}
                style={{ width: 150 }}
                key={selectedRecord?.requestType}
                options={requestType.map((type: string) => {
                  return {
                    label: type,
                    value: type
                  }
                })}
              />
            </Form.Item>
            <Button type="primary"  htmlType="submit">Confirm</Button>
          </Form>
        </Modal>
  )
}
