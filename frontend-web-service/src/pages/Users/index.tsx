import React, { useEffect } from 'react'
import { Container } from '../../GlobalStyles'
import { Button, Popconfirm, Table } from 'antd'
import { getAllUsers, deleteUser, updateUser } from '../../api/services/User'
import { Response } from '../../api/axios'
import { toast } from 'react-toastify'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

export default function Users() {

  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const notifyError = (message: string) => toast.error(message);
  const notifySuccess = (message: string) => toast.success(message);

  const handleGetAllUsers = async () => {
    const { response, error } = await getAllUsers() as Response
    if(!error) {
      setUsers(response.data)
    } 
  }

  const handleUpdateUser = async (data: any) => {
    const { response, error } = await updateUser(data) as Response
    if(!error) {
      notifySuccess(response.data.message)
      handleGetAllUsers()
    }
  }

  const handleDeleteUser = async (_id: string) => {
    setLoading(true)
    console.log(_id)
    const { response, error } = await deleteUser(_id) as Response
    if(!error) {
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
        email: user.email,
        type: user.type,
      }
    })
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    }, 
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
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
          <EditOutlined style={{ color: '#4096FF' }} onClick={() => handleUpdateUser(record)} />
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
      <div>
        <h1>Users</h1>
        <Table
          columns={columns}
          dataSource={convertDataToTable()}
        />
      </div>

      
    </Container>
  )
}
