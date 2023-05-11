import React, { useEffect, useState } from 'react'
import { ApiContainer, ApiSearchContainer, CardItem, CardValue, DataApi, LabelApi } from './styles'
import { Button, Form, Input } from 'antd'
import api from '../../../../api/axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


export default function ApisComponent() {
  const navigate = useNavigate()
  const notifyError = (message: string) => toast.error(message)
  const [listApiData, setListApiData] = useState<any[]>([])

  const getAllApis = async () => {
    try {
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/api-info`)
      if (response.status !== 200) {
        throw new Error('Error getting all apis')
      } else {
        setListApiData(response.data)
      }
    } catch (error: any) {
      notifyError(error.response.data.message)
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    }
  }


  const getApiByName = async (name: string) => {
    try {
      const response = await api.get(`${import.meta.env.BASE_URL}/api-info/${name}`)
      if (response.status !== 200) {
        throw new Error(response.data.message)
      }
      else {
        return response.data
      }

    } catch (error: any) {
      console.error(error);
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.message)
    }
  }

  useEffect(() => {
    getAllApis()
  }, [])

  return (
    <ApiContainer>
      <h1>APIs</h1>
      <ApiSearchContainer>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={getApiByName}
        >
          <Form.Item>
            <Input placeholder='Search for Api' />
            <Button type="primary">Search</Button>
          </Form.Item>
        </Form>
      </ApiSearchContainer>
      <div>
        {listApiData.length ? listApiData.map((api: any) => {
          return (
            <CardItem key={api._id}>
              <div>
                <CardValue>
                  <LabelApi>Route name: </LabelApi>
                  <DataApi>{api.routeName}</DataApi>
                </CardValue>
                <CardValue>
                  <LabelApi>Endpoint path: </LabelApi>
                  <DataApi>{api.endpointPath}</DataApi>
                </CardValue>
                <CardValue>
                  <LabelApi>Request type: </LabelApi>
                  <DataApi methodColor={api.requestType}>{api.requestType}</DataApi>
                </CardValue>
                <CardValue>
                  <LabelApi>Data return allowed: </LabelApi>
                  <DataApi>{api.dataReturnAllowed ? 'Yes' : 'No'}</DataApi>
                </CardValue>
                <CardValue>
                  <LabelApi>Errors: </LabelApi>
                  <DataApi>{api.amountErrors}</DataApi>
                </CardValue>
              </div>
            </CardItem>
          )
        }) : <h3>APIs not found or not exist</h3>}
      </div>
    </ApiContainer>
  )
}
