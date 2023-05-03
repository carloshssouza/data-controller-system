import { Button, Form, Input, Modal } from 'antd'
import React from 'react'

export default function ModalUpdate() {
  return (
    <Modal
      title="Update Restrict Data"
      open={showFormPersonal}
      onCancel={() => setShowFormPersonal(false)}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
    >
      <Form
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={updateRestrictData}
        autoComplete="off"
      >
        <Form.Item
          label="Name data"
          name="name"
          rules={[{ required: true, message: 'Name data is required' }]}
          initialValue={selectedRecord?.name}
        >
          <Input defaultValue={selectedRecord?.name} />
        </Form.Item>
        <Button type="primary" htmlType="submit">Confirm</Button>
      </Form>
    </Modal>
  )
}
