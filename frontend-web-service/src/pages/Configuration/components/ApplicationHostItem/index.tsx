import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Popconfirm } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { ConfigurationItem, ModalContainer } from './styles'

interface ApplicationHostItemProps {
  configuration: any
  deleteApplicationHost: () => Promise<void>
  checkApplicationHost: () => Promise<void>
  updateConfiguration: (data: any) => Promise<void>
  isTestLoading: boolean
}


export default function ApplicationHostItem({
  configuration,
  deleteApplicationHost,
  checkApplicationHost,
  updateConfiguration,
  isTestLoading
}: ApplicationHostItemProps) {
  const [isModalApplicationHostVisible, setIsModalApplicationHostVisible] = useState(false);

  const handleApplicationHostButtonClick = () => {
    setIsModalApplicationHostVisible(true);
  };

  return (
    <ConfigurationItem>
      <h3>Application host target:</h3>
      <div>{configuration.applicationHost}</div>
      <Button type="primary" onClick={() => handleApplicationHostButtonClick()}>Update</Button>
      <Modal
        title="Edit Configuration"
        open={isModalApplicationHostVisible}
        onCancel={() => setIsModalApplicationHostVisible(false)}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        footer={null}
      >
        <Form
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%' }}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={updateConfiguration}
          autoComplete="off"
        >
          <Form.Item
            label="Application Host"
          >
            <Input type="text"/>
          </Form.Item>
          <Button htmlType='submit' type="primary">Confirm</Button>
        </Form>
      </Modal>
      <Popconfirm
        title="Are you sure you want to delete the application host? The proxy server will not work anymore."
        onConfirm={() => deleteApplicationHost()}
      >
        <Button type="primary" danger>Delete</Button>
      </Popconfirm>


      <Button type="default" onClick={checkApplicationHost} disabled={isTestLoading}>
        {
          isTestLoading ? <LoadingOutlined /> : 'Test connection'
        }
      </Button>
    </ConfigurationItem>
  )
}
