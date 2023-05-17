import React, { useCallback, useEffect, useState } from 'react'
import { CardContent, ConfigurationItemRestrictData, RestrictDataCard, RestrictDataContainer, UniqueRestrictDataItem } from './styles'
import { Button, Form, Input, Popconfirm, Table } from 'antd'
import { Response } from '../../../../api/axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import ModalUpdate from './components/ModalUpdate'
import { addRestrictData, deleteRestrictData, getRestrictData, updateRestrictData } from '../../../../api/services/Configuration'
import { IRestrictDataList } from '../../../../interfaces/Configuration/interfaces'
import { v4 as uuidv4 } from 'uuid';



export default function RestrictDataItem() {
  const navigate = useNavigate()

  const [updateModalVisible, setUpdateModalVisible] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isPersonalLoading, setIsPersonalLoading] = useState(false)
  const [isSensibleLoading, setIsSensibleLoading] = useState(false)
  const [restrictDataList, setRestrictDataList] = useState<IRestrictDataList>({
    personal: [],
    sensible: []
  })
  const [addDataPersonal, setAddDataPersonal] = useState<string>('')
  const [addDataSensible, setAddDataSensible] = useState<string>('')

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const handleGetRestrictData = async (dataType?: string) => {
    const { response, error } = await getRestrictData(dataType) as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      if (dataType) {
        setRestrictDataList((prevState: IRestrictDataList) => ({
          ...prevState,
          [dataType]: response.data
        }))
      } else {
        setRestrictDataList(response.data)
      }
    }
  }

  const handleAddPersonalData = async () => {
    if (addDataPersonal === '' || addDataPersonal === undefined || addDataPersonal === null) {
      notifyError('Please enter a data name')
      return
    }

    const data = {
      dataName: addDataPersonal,
    }

    setIsPersonalLoading(true)
    const { response, error } = await addRestrictData(data, 'personal') as Response
    setIsPersonalLoading(false)

    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.data.message)
      clearInputPersonal()
      handleGetRestrictData('personal')
    }
  };

  const handleAddSensibleData = async () => {
    if (addDataSensible === '' || addDataSensible === undefined || addDataSensible === null) {
      notifyError('Please enter a data name')
      return
    }
    const data = {
      dataName: addDataSensible,
    }

    setIsSensibleLoading(true)
    const { response, error } = await addRestrictData(data, 'sensible') as Response
    setIsSensibleLoading(false)

    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.data.message)
      clearInputSensible()
      handleGetRestrictData('sensible')
    }
  };

  const handleUpdateRestrictData = async (record: any) => {
    const data = {
      newDataName: record?.name,
      oldDataName: selectedRecord?.name
    }
    
    const { response, error } = await updateRestrictData(data, selectedRecord?.type) as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.data.message)
      handleGetRestrictData(selectedRecord?.type)
    }
  }

  const handleDeleteRestrictData = async (record: any) => {
    const { response, error } = await deleteRestrictData(record?.name, record?.type) as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.message)
      handleGetRestrictData(record?.type)
    }
  }

  const onChangeAddDataPersonal = useCallback((e: any) => {
    setAddDataPersonal(!(e.target.value.trim().length === 0)
      ? e.target.value
      : e.target.value.trim())
  }, [setAddDataPersonal])

  const onChangeAddDataSensible = useCallback((e: any) => {
    setAddDataSensible(!(e.target.value.trim().length === 0)
      ? e.target.value
      : e.target.value.trim(),)
  }, [setAddDataSensible])

  const clearInputPersonal = useCallback(() => {
    setAddDataPersonal('')
  }, [setAddDataPersonal])

  const clearInputSensible = useCallback(() => {
    setAddDataSensible('')
  }, [setAddDataSensible])

  const onClickUpdate = (record: any) => {
    setSelectedRecord(record)
    setUpdateModalVisible(true)
  }

  const convertData = (restrictDataType: string[], type: string) => {
    const data = []
    for (const item of restrictDataType) {
      data.push({ id: uuidv4(), name: item, type })
    }
    return data
  }

  useEffect(() => {
    handleGetRestrictData()
  }, [])

  const columns = [
    {
      title: "Data name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: any) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <EditOutlined style={{ color: '#4096FF' }} onClick={() => onClickUpdate(record)} />
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={() => handleDeleteRestrictData(record)}
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
                dataSource={convertData(restrictDataList?.personal, 'personal')}
                scroll={{ y: 300 }}
                style={{ width: '600px' }}
                rowKey="id"
                pagination={{
                  style: {backgroundColor: '#ffffff', borderRadius: '5px'},
                }}
              />
              <div style={{ background: '#27293D', borderRadius: '5px', padding: '0.5rem', marginLeft: '1rem' }}>
                <h3>Add data</h3>
                <Input placeholder='Data name' style={{ marginBottom: '1rem' }} value={addDataPersonal} onChange={onChangeAddDataPersonal}/>
                <Button onClick={handleAddPersonalData} disabled={isPersonalLoading}>{isPersonalLoading ? <LoadingOutlined /> : 'Confirm'}</Button>
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
                dataSource={convertData(restrictDataList?.sensible, 'sensible')}
                scroll={{ y: 300 }}
                style={{ width: '600px' }}
                rowKey="id"
                pagination={{
                  style: {backgroundColor: '#ffffff', borderRadius: '5px'},
                }}
              />
              <div style={{ background: '#27293D', borderRadius: '5px', padding: '0.5rem', marginLeft: '1rem' }}>
                <h3>Add data</h3>
                <div style={{ background: '#27293D', borderRadius: '5px', padding: '0.5rem' }}>
                  <Input placeholder='Data name' value={addDataSensible} style={{ marginBottom: '1rem' }} onChange={onChangeAddDataSensible} />
                  <Button onClick={handleAddSensibleData} disabled={isSensibleLoading}>{isSensibleLoading ? <LoadingOutlined /> : 'Confirm'}</Button>
                </div>
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
