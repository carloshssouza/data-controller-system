import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Container } from '../../GlobalStyles'
import { UserContainer, UserItem } from './styles'
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
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  })
  const notifyError = (message: string) => toast.error(message);
  const navigate = useNavigate()

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

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
      setIsModalOpen(false)
    }
  }

  const onChangeFormData = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    handleGetUser()
  }, [])
  

  return (
    <Container>
      <UserContainer>
      <h1>My account</h1>
      <div>
        <span>Name: <UserItem>{userData.name}</UserItem></span>
        <span>Email: <UserItem>{userData.email}</UserItem></span>
      </div>
      <Button onClick={handleModalOpen}>
        Update
      </Button>
      <Modal
        title="Update user"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false)
        }}
        okButtonProps={{ form: 'update-user',  htmlType: 'submit' }}
        destroyOnClose={true}
      >
       <Form
        id="update-user"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleUpdateUser}
          autoComplete="off"
        >
          <Form.Item
            label={<label style={{ color: 'black' }}>Name</label>}
            name="name"
            rules={[{ required: false}]}
            initialValue={userData.name || formData.name}
          >
            <Input name="name" onChange={onChangeFormData}/>
          </Form.Item>
          <Form.Item
            label={<label style={{ color: 'black' }}>Password</label>}
            name="password"
            
            rules={[{ required: false }]}
          >
            <Input.Password  name="password" onChange={onChangeFormData}/>
          </Form.Item>
        </Form>
      </Modal>
      </UserContainer>
    </Container>
  )
}
