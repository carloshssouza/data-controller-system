import React, { useState, useEffect, useCallback } from 'react'
import api from '../../api/axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Checkbox, Form, Input, Modal, Select, Table, Popconfirm } from 'antd';

import { ApiAddContainer, ApiListContainer } from './styles';

interface IApiData {
  routeName: string;
  endpointPath: string;
  requestType: string;
  dataReturnAllowed: boolean;
}

const requestType = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

export default function Api() {
  const [listApisData, setListApisData] = useState([])
  const [selectRequestType, setSelectRequestType] = useState(requestType[0])
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>();
  const [apiUpdateData, setApiUpdateData] = useState({
    routeName: '',
    endpointPath: '',
    requestType: '',
    dataReturnAllowed: false
  })

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const onChangeUpdateRequestType = (e: any) => {
    console.log(e.target)
  }

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
      data.requestType = selectRequestType
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

  const updateApi = async (data: any) => {
    console.log(data)
    // try {
    //   const config = {
    //     headers: {
    //       'authorization': `Bearer ${localStorage.getItem('token')}`
    //     }
    //   }

    //   const response = await api.put(`${import.meta.env.VITE_BASE_URL}/api/${selectedRecord._id}`, data, config)
    //   if (response.status !== 200) {
    //     throw new Error('Update api failed')
    //   } else {
    //     notifySuccess("Api updated")
    //     await getAllApis()
    //   }
    // } catch (error: any) {
    //   notifyError(error.message)
    // }
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
        <div>{record.dataReturnAllowed ? "Yes" : "No"}</div>
      )
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: any) => (
        <>
          <Button onClick={() => handleUpdate(record)}>Update</Button>
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={() => deleteApi(record._id)}
          >
            <Button>Delete</Button>
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
    console.log(listApisData)
  }, [])

  useEffect(() => {
    
    console.log('api', selectedRecord)
  }, [selectedRecord])

  return (
    <>
      <ApiAddContainer>
        <h1>Add new APIs</h1>
        <div>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={createApi}
            autoComplete="off"
          >
            <Form.Item
              name="routeName"
              rules={[{ required: true, message: 'Route name is required' }]}
            >
              <Input placeholder="Route name" />
            </Form.Item>
            <Form.Item
              name="endpointPath"
              rules={[{ required: true, message: 'Endpoint path is required' }]}
            >
              <Input placeholder="Endpoint path" />
            </Form.Item>
            <Form.Item
              name="requestType"
              rules={[{ required: true, message: 'Request type is required' }]}
            >
              <Select
                defaultValue={apiUpdateData.requestType}
                style={{ width: 150 }}
                onChange={handleChangeRequestType}
                options={requestType.map((type: string) => {
                  return {
                    label: type,
                    value: type
                  }
                })}
              />
            </Form.Item>
            <Form.Item
              name="dataReturnAllowed"
              valuePropName="checked"
              style={{ marginRight: "2rem" }}
            >
              <Checkbox style={{color: "white"}}>Return personal and sensible data</Checkbox>
            </Form.Item>
            <Button type="primary"  htmlType="submit">Add</Button>
          </Form>
        </div>
      </ApiAddContainer>
      <ApiListContainer>
        <h1>List of APIs</h1>
        <Table columns={columns} dataSource={listApisData} />
        <Modal
          title="Update Route"
          open={updateModalVisible}
          onCancel={() => setUpdateModalVisible(false)}
          cancelButtonProps={{style: {display: 'none'}}}
          okButtonProps={{ style: { display: 'none' } }}
        >
           <Form
            style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={updateApi}
            autoComplete="off"
          >
            <Form.Item
              label="Route Name"
              name="routeName"
              rules={[{ required: true, message: 'Route name is required' }]}
            >
              <Input defaultValue={selectedRecord?.routeName}/>
            </Form.Item>
            <Form.Item
              label="Endpoint Path"
              name="endpointPath"
              rules={[{ required: true, message: 'Endpoint path is required' }]}
            >
              <Input defaultValue={selectedRecord?.endpointPath} />
            </Form.Item>
            <Form.Item
              label="Request Type"
              name="requestType"
              rules={[{ required: true, message: 'Request type is required' }]}
            >
              <Select
                defaultValue={selectedRecord?.requestType}
                style={{ width: 150 }}
                options={requestType.map((type: string) => {
                  return {
                    label: type,
                    value: type
                  }
                })}
              />
            </Form.Item>
            <Form.Item
              name="dataReturnAllowed"
              style={{ marginRight: "2rem" }}
              valuePropName='checked'
            >
            <Checkbox style={{color: "black"}}>Return personal and sensible data</Checkbox>
            </Form.Item>
            <Button type="primary"  htmlType="submit">Confirm</Button>
          </Form>
        </Modal>
      </ApiListContainer>
      <ToastContainer />
    </>
  )
}
