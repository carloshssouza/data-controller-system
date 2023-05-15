import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Container } from '../../GlobalStyles'
import { UserContainer } from './styles'
import { Button, Form, Input, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getUser, updateUser } from '../../api/services/User'
import { set } from 'date-fns'
import { Response } from '../../api/axios'

interface IUserData {
  name?: string
  email?: string
}


export default function User() {
  const [userData, setUserData] = useState<IUserData>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const notifyError = (message: string) => toast.error(message);
  const navigate = useNavigate()

  const handleGetUser = async() => {
    const {response, error} = await getUser() as Response
    if(!error) {
      setUserData(response.data)
    } 
  }

  const handleUpdateUser = async (data: any) => {
    const {response, error} = await updateUser(data) as Response
    if(!error) {
      setUserData(response.data)
    }
  }

  useEffect(() => {
    handleGetUser()
  }, [])
  

  return (
    <Container>
      <UserContainer>
      <h1>My account</h1>
      <div>
      <div>{userData.name}</div>
      <div>{userData.email}</div>
      </div>
      <Button>
        Update
      </Button>
      <Modal
        title="Update user"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
      >
        <Form
          onFinish={handleUpdateUser}
        >
          <Form.Item>
            <Input />
          </Form.Item>
          <Button htmlType='submit'>
            Confirm
          </Button>
        </Form>
      </Modal>
      </UserContainer>
    </Container>
  )
}
