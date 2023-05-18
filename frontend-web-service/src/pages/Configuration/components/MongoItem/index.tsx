import React, { useState } from 'react'
import { ConfigurationItem } from './styles'
import { Button, Form, Input, Modal, Popconfirm } from 'antd'

interface MongoItemProps {
  configuration: any
  deleteMongoDatabaseConnection: () => Promise<void>
}


export default function MongoItem({ 
  configuration, 
  deleteMongoDatabaseConnection
}: MongoItemProps) {
  const [isModalMongoConnectionVisible, setIsModalMongoConnectionVisible] = useState(false);
  const handleMongoConnectionButtonClick = () => {
    setIsModalMongoConnectionVisible(true);
  };

  return (
    <ConfigurationItem>
          <h3>Mongo Connection:</h3>
          <div>{configuration.mongoUriHost}</div>
          <Button type="primary" onClick={handleMongoConnectionButtonClick}>Update</Button>
          <Popconfirm
            title="Are you sure you want to delete the mongo database connection? This will logout your user and you will need to set a new configuration."
            onConfirm={() => deleteMongoDatabaseConnection()}
          >
            <Button type="primary" danger>Delete</Button>
          </Popconfirm>
          <Modal
            title="Edit Configuration"
            open={isModalMongoConnectionVisible}
            onCancel={() => setIsModalMongoConnectionVisible(false)}
            footer={null}
            destroyOnClose={true}
          >
            <Form>
              <Form.Item
                label="Mongo Database Connection"
                name="mongoUriHost"
                rules={[{ required: true, message: 'Mongo Database Connection is required' }]}
                initialValue={configuration.mongoUriHost}
              >
                <Input placeholder="Mongo Database Connection" />
              </Form.Item>
            </Form>
          </Modal>
        </ConfigurationItem>
  )
}
