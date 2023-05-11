import React, { useEffect, useState } from 'react'
import { CardContent, ConfigurationItemRestrictData, RestrictDataCard, RestrictDataContainer, UniqueRestrictDataItem } from './styles'
import { Button, Form, Input, Popconfirm, Table } from 'antd'
import { Response } from '../../../../api/axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import ModalUpdate from './components/ModalUpdate'
import { addRestrictData, deleteRestrictData, updateRestrictData } from '../../../../api/services/Configuration'



interface RestrictDataItemProps {
  restrictDataPersonal: { name: string, type: string }[]
  restrictDataSensible: { name: string, type: string }[]
  getRestrictData: (dataType?: string) => Promise<void>
}


export default function RestrictDataItem({ restrictDataPersonal, restrictDataSensible, getRestrictData }: RestrictDataItemProps) {
  const navigate = useNavigate()

  const [updateModalVisible, setUpdateModalVisible] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const handleAddRestrictData = async (record: any, dataType: string) => {
    const { response, error } = await addRestrictData(record.name, dataType) as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.data.message)
      getRestrictData(selectedRecord?.type)
    }
  }

  const handleAddPersonalData = (values: any) => {
    console.log("values", values)
    const { dataName } = values;
    addRestrictData(dataName, 'personal');
  };

  const handleAddSensibleData = (values: any) => {
    const { dataName } = values;
    addRestrictData(dataName, 'sensible');
  };
  
  const handleUpdateRestrictData = async (record: any) => {
    const { response, error } = await updateRestrictData(record, selectedRecord?.dataType) as Response
    if(error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.data.message)
      getRestrictData(selectedRecord?.type)
    }
  }

  const handleDeleteRestrictData = async (name: string) => {
    const {response, error} = await deleteRestrictData(name, selectedRecord?.type) as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.message)
      getRestrictData(selectedRecord?.type)
    }
  }


  const onClickUpdate = (record: string) => {
    setSelectedRecord(record)
    setUpdateModalVisible(true)
  }

  const columns = [
    {
      title: "Data name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: any) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <EditOutlined style={{ color: '#4096FF' }} onClick={() => onClickUpdate(record)} />
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={() => handleDeleteRestrictData(record.name)}
          >
            <DeleteOutlined style={{ color: '#FF7875' }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <ConfigurationItemRestrictData>
      <h2>Restrict Data List</h2>
      <RestrictDataContainer>
        <RestrictDataCard>
          <h3>Personal Data</h3>
          {
            <CardContent>
              <Table
                key='personal'
                columns={columns}
                dataSource={restrictDataPersonal}
                scroll={{ y: 300 }}
                style={{ width: '300px' }}
                rowKey={(record) => record.name}
              />
              <div style={{background: '#27293D', borderRadius: '5px', padding: '0.5rem'}}>
                <h3>Add new personal data</h3>
                <Form
                  onFinish={handleAddPersonalData}
                  style={{ marginTop: '20px' }}
                >
                  <Form.Item>
                    <Input placeholder='Data name' />
                  </Form.Item>
                  <Button htmlType='submit'>{isLoading ? <LoadingOutlined /> : 'Confirm'}</Button>
                </Form>
              </div>

            </CardContent>

          }
        </RestrictDataCard>
        <RestrictDataCard>
          <h3>Sensible Data</h3>
          {
            <CardContent>
              <Table
                key="sensible"
                columns={columns}
                dataSource={restrictDataSensible}
                scroll={{ y: 300 }}
                style={{ width: '300px' }}
                rowKey={(record) => record.name}
              />
              <div style={{background: '#27293D', borderRadius: '5px', padding: '0.5rem'}}>
                <h3>Add new sensible data</h3>
                <Form
                  onFinish={handleAddSensibleData}
                  style={{ marginTop: '20px' }}
                >
                  <Form.Item>
                    <Input placeholder='Data name' />
                  </Form.Item>
                  <Button htmlType='submit'>{isLoading ? <LoadingOutlined /> : 'Confirm'}</Button>
                </Form>

              </div>
            </CardContent>

          }
        </RestrictDataCard>
        <ModalUpdate
          updateModalVisible={updateModalVisible}
          updateRestrictData={handleUpdateRestrictData}
          setUpdateModalVisible={setUpdateModalVisible}
          selectedRecord={selectedRecord}
        />
      </RestrictDataContainer>
    </ConfigurationItemRestrictData>
  )
}
