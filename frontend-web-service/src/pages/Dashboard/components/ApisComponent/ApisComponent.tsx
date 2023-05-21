import React, { useEffect, useState } from 'react'
import { ApiContainer, ApiSearchContainer, CardItem, CardValue, DataApi, LabelApi } from './styles'
import { Button, Form, Input } from 'antd'
import { Response } from '../../../../api/axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAllApis, getApiByName } from '../../../../api/services/Api'

interface ApisComponentProps {
  errorLog: any
}


export default function ApisComponent({errorLog}: ApisComponentProps) {
  const navigate = useNavigate()
  const notifyError = (message: string) => toast.error(message)
  const [listApiData, setListApiData] = useState<any[]>([])

  const handleGetAllApis = async () => {
    const { response, error } = await getAllApis() as Response
    if(error) {
      notifyError(response.data.message)
    } else {
      setListApiData(response.data)
    }
  }


  const handleGetApiByName = async (name: string) => {
    const { response, error } = await getApiByName(name) as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      
    }
  }
  
  useEffect(() => {
    handleGetAllApis()
  }, [errorLog])

  return (
    <ApiContainer>
      <h1>APIs</h1>
      <ApiSearchContainer>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleGetApiByName}
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
