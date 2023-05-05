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
import { createApi, updateApi, deleteApi, getAllApis, onChangeUpdateDataReturnAllowed } from '../../api/services/Api';

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

  const handleGetAllApis = async () => {
    const response = await getAllApis()
    if(response.error) {
      if(response.status === 401) {
        navigate('/login')
      }
      notifyError(response.message)
    } else {
      setListApisData(response)
    }
  }

  const handleCreateApi = async (data: any) => {
    const response = await createApi(data, selectRequestType)
    if (response.error) {
      if(response.status === 401) {
        navigate('/login')
      }
      notifyError(response.message)
    } else {
      notifySuccess(response.message)
      await handleGetAllApis()
    }
  }

  const handleUpdateApi = async (data: any) => {
    const response = await updateApi(data, selectedRecord)
    if(response.error) {
      if(response.status === 401) {
        navigate('/login')
      }
      notifyError(response.message)
    } else {
      notifySuccess(response.message)
      await handleGetAllApis()
    }
  }

  const handleDeleteApi = async (id: string) => {
    const response = await deleteApi(id)
    if(response.error) {
      if(response.status === 401) {
        navigate('/login')
      }
      notifyError(response.message)
    } else {
      notifySuccess(response.message)
      await handleGetAllApis()
    }
  }

  const handleOnChangeUpdateDataReturnAllowed = async (dataReturnAllowed: boolean, _id: any) => {
    const response = await onChangeUpdateDataReturnAllowed(dataReturnAllowed, _id)
    if(response.error) {
      if(response.status === 401) {
        navigate('/login')
      }
      notifyError(response.message)
    } else {
      notifySuccess(response.message)
      await handleGetAllApis()
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
            onConfirm={() => handleDeleteApi(record._id)}
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
    console.log("record", record)
    setSelectedRecord(record);
  };

  const handleChangeRequestType = useCallback((requestType: string) => {
    setSelectRequestType(requestType)
  }, [])

  useEffect(() => {
    if (!listApisData.length) {
      handleGetAllApis()
    }
  }, [])

  return (
    <Container>
      <ApiAddContainer>
        <h1>Add new APIs</h1>
        <FormAddApiComponent
          createApi={handleCreateApi}
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
                updateApi={handleUpdateApi}
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
