import React, { useContext, useEffect, useState } from 'react'
import api from '../../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import { Button, Form, Input, Modal, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../GlobalStyles';
import { ConfigurationContainer, ConfigurationContainerRestrict, ConfigurationItem, ConfigurationItemRestrictData } from './styles';


const restrictDataList = {
  personal: [
    'name',
    'email'
  ],
  sensible: [
    'race',
    'religion'
  ]
}

interface IRestrictDataList {
  personal: string[]
  sensible: string[]
}

interface IConfiguration {
  mongoUriHost?: string
  applicationHost?: string
  restrictDataList?: IRestrictDataList
}

const confirm = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
  message.success('Click on Yes');
};

export default function Configuration() {
  const navigate = useNavigate()
  const notifyError = (message: string) => toast.error(message);
  const notifySuccess = (message: string) => toast.success(message)

  const [isModalMongoConnectionVisible, setIsModalMongoConnectionVisible] = useState(false);
  const [isModalApplicationHostVisible, setIsModalApplicationHostVisible] = useState(false);

  const [configuration, setConfiguration] = useState<IConfiguration>({})

  const getConfiguration = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }

      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/configuration`, config)

      if (response.status !== 200) {
        throw new Error(response.data.message)
      } else {
        setConfiguration(response.data)
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.message)
    }
  }

  const logoutUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.post(`${import.meta.env.VITE_BASE_URL}/logout`, config)
      if (response.status !== 200) {
        throw new Error('Logout failed')
      } else {
        localStorage.removeItem('token')
        navigate('/login')
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.message)
    }
  }

  const deleteMongoDatabaseConnection = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.delete(`${import.meta.env.VITE_BASE_URL}/configuration/mongo-database-connection`, config)
      if(response.status !== 200) {
        throw new Error(response.data.message)
      } else {
        notifySuccess(response.data.message)
        setTimeout(() => {
          logoutUser()
        }, 3000)
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  const handleMongoConnectionButtonClick = () => {
    setIsModalMongoConnectionVisible(true);
  };
  const handleApplicationHostButtonClick = () => {
    setIsModalMongoConnectionVisible(true);
  };

  useEffect(() => {
    getConfiguration()
  }, [])

  return (
    <Container>
      <ConfigurationContainer>
        <h1>Configuration</h1>
        <ConfigurationItem>
          <h3>Mongo Database Connection:</h3>
          <div>{configuration.mongoUriHost}</div>
          <Button type="primary" onClick={() => handleMongoConnectionButtonClick()}>Update</Button>
          <Popconfirm
            title="Are you sure you want to delete the mongo database connection? This will logout your user"
            onConfirm={() => deleteMongoDatabaseConnection()}
          >
            <Button style={{ background: "#E5484D", color: 'white' }}>Delete</Button>
          </Popconfirm>
          <Modal
            title="Edit Configuration"
            open={isModalMongoConnectionVisible}
            onCancel={() => setIsModalMongoConnectionVisible(false)}
            footer={null}
          >
            <Form>
              <Form.Item>
                <Input placeholder="Mongo Database Connection" />
              </Form.Item>
            </Form>
          </Modal>
        </ConfigurationItem>
        <ConfigurationItem>
          <h3>Application host target:</h3>
          <div>{configuration.applicationHost}</div>
          <Button type="primary" onClick={() => handleApplicationHostButtonClick()}>Update</Button>
          
          <Modal
            title="Edit Configuration"
            open={isModalMongoConnectionVisible}
            onCancel={() => setIsModalApplicationHostVisible(false)}
            footer={null}
          >
            <Form>
              <Form.Item>
                <Input placeholder="Mongo Database Connection" />
              </Form.Item>
            </Form>
          </Modal>
          <Popconfirm
            title="Are you sure you want to delete the mongo database connection? This will logout your user"
            onConfirm={() => deleteMongoDatabaseConnection()}
          >
            <Button style={{ background: "#E5484D", color: 'white' }}>Delete</Button>
          </Popconfirm>
          <Modal
            title="Edit Configuration"
            open={isModalApplicationHostVisible}
            onCancel={() => setIsModalApplicationHostVisible(false)}
            footer={null}
          >
            <Form>
              <Form.Item>
                <Input placeholder="Mongo Database Connection" />
              </Form.Item>
            </Form>
          </Modal>
        </ConfigurationItem>

      </ConfigurationContainer>

      <ConfigurationContainerRestrict>
        <ConfigurationItemRestrictData>
          <h2>Restrict Data List</h2>
          <div>
            <div>
              <h4>Personal</h4>
              <div>{restrictDataList.personal}</div>
            </div>
            <div>
              <h4>Sensible</h4>
              <div>{restrictDataList.sensible}</div>
            </div>
          </div>
        </ConfigurationItemRestrictData>
        <Button>Start proxy server</Button>
      </ConfigurationContainerRestrict>

      <ToastContainer />
    </Container>
  )
}
