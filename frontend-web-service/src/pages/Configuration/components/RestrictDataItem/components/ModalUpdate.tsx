import { Button, Form, Input, Modal } from 'antd'

interface ModalUpdateProps {
  updateRestrictData: (record: any) => Promise<void>
  updateModalVisible: boolean
  setUpdateModalVisible: (value: boolean) => void
  selectedRecord: any
}

export default function ModalUpdate({ updateRestrictData, updateModalVisible, setUpdateModalVisible, selectedRecord }: ModalUpdateProps) {
  return (
    <Modal
      title="Update Data Restrict"
      open={updateModalVisible}
      onCancel={() => {
        setUpdateModalVisible(false)
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      destroyOnClose={true}
    >
      <Form
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={updateRestrictData}
        autoComplete="off"
      >
        <Form.Item
          key={selectedRecord?.name}
          label="Data name"
          name="name"
          rules={[{ required: true, message: 'Data name is required' }]}
        >
          <Input defaultValue={selectedRecord?.name} key={selectedRecord?.name} />
        </Form.Item>
        <Button type="primary" htmlType="submit">Confirm</Button>

      </Form>
    </Modal>
  )
}
