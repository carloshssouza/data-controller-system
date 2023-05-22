import React, { useState, useEffect, useCallback } from 'react'
import { Response } from '../../api/axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Table, Popconfirm, Checkbox, Form } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ApiAddContainer, ApiListContainer } from './styles';
import ModalUpdateApiComponent from './components/ModalUpdateApiComponent';
import FormAddApiComponent from './components/FormAddApiComponent';
import { Container } from '../../GlobalStyles';
import { updateApi, deleteApi, getAllApis, onChangeUpdateDataReturnAllowed } from '../../api/services/Api';
import { IApi } from '../../interfaces/Api/interfaces';
import NotFoundComponent from '../../utils/NotFoundComponent/NotFoundComponent';

const requestType = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

export default function Api() {

  const [listApisData, setListApisData] = useState<IApi[]>([])
  const [selectedRecord, setSelectedRecord] = useState<any>();
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [form] = Form.useForm();

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const handleGetAllApis = async () => {
    const { response, error } = await getAllApis() as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      setListApisData(response.data)
    }
  }

  const handleUpdateApi = async (data: any) => {
    const { response, error } = await updateApi(data, selectedRecord) as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.data.message)
      await handleGetAllApis()
    }
  }

  const handleDeleteApi = async (id: string) => {
    const { response, error } = await deleteApi(id) as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.data.message)
      await handleGetAllApis()
    }
  }

  const handleOnChangeUpdateDataReturnAllowed = async (dataReturnAllowed: boolean, _id: any) => {
    const {response, error} = await onChangeUpdateDataReturnAllowed(dataReturnAllowed, _id) as Response
    if(error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.data.message)
      await getAllApis()
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
              handleOnChangeUpdateDataReturnAllowed(event.target.checked, record._id)}
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
    setSelectedRecord(record);
  };

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
          getAllApis={handleGetAllApis}
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
              <div style={{minWidth: '20%'}}>
              <Table 
                columns={columns}
                dataSource={listApisData.map((data: IApi) => ({ ...data, key: data?._id }))}
                scroll={{ y: 400, x: 600 }}
                style={{ width: '1000px' }}
              />
              </div> 
            </div>
          ) : (
            <NotFoundComponent />
          )
        }
      </ApiListContainer>
    </Container>
  )
}
