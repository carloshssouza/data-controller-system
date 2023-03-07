import React, { useState, useEffect, useCallback } from 'react'
import api from '../../api/axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Table, Popconfirm, Checkbox, Form } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ApiAddContainer, ApiListContainer } from './styles';
import ModalUpdateApiComponent from './components/ModalUpdateApiComponent';
import FormAddApiComponent from './components/FormAddApiComponent';
import { Container } from '../../GlobalStyles';

interface IApiData {
  routeName: string;
  endpointPath: string;
  requestType: string;
  dataReturnAllowed: boolean;
}

const requestType = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

export default function Api() {

  const navigate = useNavigate()
  const [listApisData, setListApisData] = useState<IApiData[]>([])
  const [selectRequestType, setSelectRequestType] = useState<string>(requestType[0])
  const [selectedRecord, setSelectedRecord] = useState<any>();
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

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
      if(error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.response.data.message)
    }
  }

  const createApi = async (data: any) => {
    try {
      const config = {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
      data.requestType = selectRequestType
      const response = await api.post(`${import.meta.env.VITE_BASE_URL}/api-info`, data, config)
      if (response.status !== 201) {
        throw new Error('Create api failed')
      } else {
        notifySuccess(response.data.message)
        await getAllApis()
      }
    } catch (error: any) {
      if(error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.response.data.message)
    }
  }

  const updateApi = async (data: any) => {
    try {
      const config = {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }

      const response = await api.put(`${import.meta.env.VITE_BASE_URL}/api/${selectedRecord._id}`, data, config)
      if (response.status !== 200) {
        throw new Error('Update api failed')
      } else {
        notifySuccess("Api updated")
        await getAllApis()
      }
    } catch (error: any) {
      if(error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.response.data.message)
    }
  }

  const deleteApi = async (id: string) => {
    try {
      const config = {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.delete(`${import.meta.env.VITE_BASE_URL}/api-info/${id}`, config)
      if (response.status !== 200) {
        throw new Error('Deleted api failed')
      } else {
        notifySuccess(response.data.message)
        await getAllApis()
      }
    } catch (error: any) {
      if(error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.response.data.message)
    }
  }

  const onChangeUpdateDataReturnAllowed = async (dataReturnAllowed: boolean, _id: any) => {
    try {
      const response = await api.put(`${import.meta.env.VITE_BASE_URL}/api-info/${_id}`, { dataReturnAllowed })
      if(response.status !== 200) {
        throw new Error(response.data.message)
      } else {
        notifySuccess(response.data.message)
        getAllApis()
      }
    } catch (error: any) {
      console.log("error")
      if(error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.response.data.message)
    }
  }

  const columns = [
    {
      title: "Route Name",
      dataIndex: "routeName",
      key: "routeName",
    },
    {
      title: "Endpoint Path",
      dataIndex: "endpointPath",
      key: "endpointPath",
    },
    {
      title: "Request Type",
      dataIndex: "requestType",
      key: "requestType",
    },
    {
      title: "Data Return Allowed",
      key: "dataReturnAllowed",
      render: (text: string, record: any) => (
        <Form>
          <Form.Item
            name="dataReturnAllowed"
            style={{ marginRight: "2rem" }}
            valuePropName="checked"
            initialValue={record.dataReturnAllowed}
          >
            <Checkbox style={{ color: "black" }} onChange={(event) =>
                onChangeUpdateDataReturnAllowed(event.target.checked, record._id)}
              defaultChecked={false}
            >
              {record.dataReturnAllowed ? "Yes" : "No"}
            </Checkbox>
          </Form.Item>
        </Form>

      )
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: any) => (
        <>
          <Button type="primary" onClick={() => handleUpdate(record)}>Update</Button>
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={() => deleteApi(record._id)}
          >
            <Button style={{ background: "#E5484D" }}>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleUpdate = (record: any) => {
    // Open the update modal and pass the record data
    setUpdateModalVisible(true);
    setSelectedRecord(record);
  };

  const handleChangeRequestType = useCallback((requestType: string) => {
    setSelectRequestType(requestType)
  }, [])

  useEffect(() => {
    if (!listApisData.length) {
      getAllApis()
    }
  }, [])

  return (
    <Container>
      <ApiAddContainer>
        <h1>Add new APIs</h1>
        <FormAddApiComponent
          createApi={createApi}
          selectRequestType={selectRequestType}
          handleChangeRequestType={handleChangeRequestType}
          requestType={requestType}
        />
      </ApiAddContainer>
      <ApiListContainer>
        <h1>List of APIs</h1>
        {
          listApisData.length ? (
            <div>
              <ModalUpdateApiComponent
                updateModalVisible={updateModalVisible}
                setUpdateModalVisible={setUpdateModalVisible}
                updateApi={updateApi}
                selectedRecord={selectedRecord}
                requestType={requestType}
              />
              <Table columns={columns} dataSource={listApisData} />
            </div>
          ) : (
            <div>No data</div>
          )
        }
      </ApiListContainer>
      <ToastContainer toastStyle={{ backgroundColor: "black", color: "white" }}/>
    </Container>
  )
}
