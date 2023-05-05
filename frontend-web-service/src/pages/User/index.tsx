import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Container } from '../../GlobalStyles'
import { UserContainer } from './styles'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../api/services/User'

interface IUserData {
  name?: string
  email?: string
}


export default function User() {
  const [userData, setUserData] = useState<IUserData>({})
  const notifyError = (message: string) => toast.error(message);
  const navigate = useNavigate()

  const handleGetUser = async() => {
    const response = await getUser()
    if(response.error) {
      if(response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(response.message)
    } else {
      setUserData(response)
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
        Editar
      </Button>
      </UserContainer>
      <ToastContainer />
    </Container>
  )
}
