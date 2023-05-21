import React, { useEffect } from 'react'
import { Container } from '../../GlobalStyles'
import { Button, Form, Input, Modal, Popconfirm, Select, Table } from 'antd'
import { getAllUsers, deleteUser, updateUser } from '../../api/services/User'
import { Response } from '../../api/axios'
import { toast } from 'react-toastify'
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import RegisterFormComponent from './RegisterFormComponent/RegisterFormComponent'
import { RegisterFormContainer, UsersTableContainer } from './RegisterFormComponent/styles'

const userTypeList = ['admin', 'user']

export default function Users() {

  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [showModalUpdate, setShowModalUpdate] = React.useState(false)
  const [selectedRecord, setSelectedRecord] = React.useState<any>()
  const [userType, setUserType] = React.useState(userTypeList[0])

  const notifyError = (message: string) => toast.error(message);
  const notifySuccess = (message: string) => toast.success(message);

  const handleGetAllUsers = async () => {
    const { response, error } = await getAllUsers() as Response
    if (!error) {
      setUsers(response.data)
    }
  }

  const handleUpdateUser = async (data: any) => {
    data._id = selectedRecord.key
    const { response, error } = await updateUser(data) as Response
    if (!error) {
      notifySuccess(response.data.message)
      setShowModalUpdate(false)
      handleGetAllUsers()
    }
  }

  const handleDeleteUser = async (_id: string) => {
    setLoading(true)
    console.log(_id)
    const { response, error } = await deleteUser(_id) as Response
    if (!error) {
      notifySuccess(response.data.message)
      handleGetAllUsers()
    } else {
      notifyError(response.data.message)
    }
    setLoading(false)
  }

  const convertDataToTable = () => {
    return users.map((user: any) => {
      return {
        key: user._id,
        name: user.name,
        accountName: user.accountName,
        type: user.type,
      }
    })
  }

  const handleShowModalUpdate = (record: any) => {
    console.log("record", record)
    setSelectedRecord(record)
    setShowModalUpdate(true)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Account name',
      dataIndex: 'accountName',
      key: 'accountName'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: any) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <EditOutlined style={{ color: '#4096FF' }} onClick={() => handleShowModalUpdate(record)} />
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={() => handleDeleteUser(record.key)}
          >
            <DeleteOutlined style={{ color: '#FF7875' }} />
          </Popconfirm>
        </div>
      ),
    },
  ]

  useEffect(() => {
    handleGetAllUsers()
  }, [])

  return (
    <Container>
      <RegisterFormContainer>
        <h1>Register a user</h1>
        <RegisterFormComponent handleGetAllUsers={handleGetAllUsers} />
      </RegisterFormContainer>
      <UsersTableContainer>
        <h1>Users</h1>
        <Table
          columns={columns}
          dataSource={convertDataToTable()}
        />
        <Modal
          title="Update User"
          open={showModalUpdate}
          onCancel={() => setShowModalUpdate(false)}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
          destroyOnClose={true}
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={handleUpdateUser}
            autoComplete="off"
          >
            <Form.Item
              name="name"
              rules={[{ required: false }]}
              initialValue={selectedRecord?.name}
            >
              <Input placeholder='User Name'/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: false }]}
            >
              <Input.Password placeholder='Password' />
            </Form.Item>
            <Form.Item>
              <Select
                defaultValue={selectedRecord?.type}
                style={{ width: 150 }}
                options={userTypeList.map((type: string) => {
                  return {
                    label: type,
                    value: type
                  }
                })}
              />
            </Form.Item>
            <Button type="primary" disabled={loading} htmlType='submit'>{loading ? <LoadingOutlined /> : 'Confirm'}</Button>
          </Form>
        </Modal>
      </UsersTableContainer>
    </Container>
  )
}
