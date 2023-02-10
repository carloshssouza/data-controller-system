import React, { useState, useEffect, useCallback } from 'react'
import api from '../../api/axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {
  FormGroup,
  Form,
  Input,
  Label,
  Button
} from 'reactstrap'

import DropdownComponent from '../../components/Dropdown';

export default function Api() {
  const [listApisData, setListApisData] = useState([])
  const [apiDataForm, setApiDataForm] = useState({
    routeName: '',
    endpointPath: '',
    dataReturnAllowed: false
  })
  const [selectRequestType, setSelectRequestType] = useState('')

  const requestType = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const getAllApis = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/api-info`, config)
      if (response.status !== 200) {
        throw new Error('Error getting all apis')
      } else {
        setListApisData(response.data)
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  const createApi = async (data: any) => {
    try {
      const config = {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.post(`${import.meta.env.VITE_BASE_URL}/api-info`, data, config)
      if (response.status !== 200) {
        throw new Error('Update api failed')
      } else {
        notifySuccess("Api created")
        await getAllApis()
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  const updateApi = async (id: string, data: any) => {
    try {
      const config = {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/${id}`, data)
      if (response.status !== 200) {
        throw new Error('Update api failed')
      } else {
        notifySuccess("Api updated")
        await getAllApis()
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  const deleteApi = async (id: string) => {
    try {
      const config = {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}/api/${id}`, config)
      if (response.status !== 200) {
        throw new Error('Deleted api failed')
      } else {
        notifySuccess("Api deleted")
        await getAllApis()
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  useEffect(() => {
    console.log(selectRequestType)
  }, [selectRequestType])

  return (
    <div>
      <div>
        Adicionar APIs
        <Form style={{ display: 'flex' }}>
          <FormGroup>
            <Label
              hidden
            >
              Route Name
            </Label>
            <Input
              id="routeName"
              name="routeName"
              placeholder="Route Name"
              type="text"
            // onChange={onChangeLogin}
            />
          </FormGroup>
          <FormGroup>
            <Label
              hidden
            >
              Endpoint Path
            </Label>
            <Input
              id="endpointPath"
              name="endpointPath"
              placeholder="Endpoint Path"
              type="text"
            // onChange={onChangeLogin}
            />
          </FormGroup>
          <FormGroup>
            <DropdownComponent
              itemsList={requestType}
              direction='down'
              setItem={setSelectRequestType}
              item={selectRequestType}
            />
          </FormGroup>
          <FormGroup>
            <Label
              hidden
            >
              Data Return Allowed
            </Label>
            <Input
              id="dataReturnAllowed"
              name="dataReturnAllowed"
              placeholder="Data Return Allowed"
              type="text"
            // onChange={onChangeLogin}
            />
          </FormGroup>
          <Button color="success">Add</Button>
        </Form>
      </div>
      <div>
        Apis
        <Form style={{ display: 'flex' }}>
          <FormGroup>
            <Label
              hidden
            >
              Route Name
            </Label>
            <Input
              id="routeName"
              name="routeName"
              placeholder="Route Name"
              type="text"
            // onChange={onChangeLogin}
            />
          </FormGroup>
          <FormGroup>
            <Label
              hidden
            >
              Endpoint Path
            </Label>
            <Input
              id="endpointPath"
              name="endpointPath"
              placeholder="Endpoint Path"
              type="text"
            // onChange={onChangeLogin}
            />
          </FormGroup>
          <FormGroup>
            <Label
              hidden
            >
              Type Request
            </Label>
            <Input
              id="typeRequest"
              name="typeRequest"
              placeholder="Type Request"
              type="text"
            // onChange={onChangeLogin}
            />
          </FormGroup>
          <FormGroup>
            <Label
              hidden
            >
              Data Return Allowed
            </Label>
            <Input
              id="dataReturnAllowed"
              name="dataReturnAllowed"
              placeholder="Data Return Allowed"
              type="text"
            // onChange={onChangeLogin}
            />
          </FormGroup>
        </Form>
      </div>

      <ToastContainer />
    </div>
  )
}
