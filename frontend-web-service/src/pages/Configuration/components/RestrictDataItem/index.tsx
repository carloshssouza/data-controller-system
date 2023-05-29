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
  const [isPersonalLoading, setIsPersonalLoading] = useState(false)
  const [isSensitiveLoading, setIsSensitiveLoading] = useState(false)
  const [restrictDataList, setRestrictDataList] = useState<IRestrictDataList>({
    personal: [],
    sensitive: []
  })
  const [addDataPersonal, setAddDataPersonal] = useState<string>('')
  const [addDataSensitive, setAddDataSensitive] = useState<string>('')

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

  const handleAddSensitiveData = async () => {
    if (addDataSensitive === '' || addDataSensitive === undefined || addDataSensitive === null) {
      notifyError('Please enter a data name')
      return
    }
    const data = {
      dataName: addDataSensitive,
    }

    setIsSensitiveLoading(true)
    const { response, error } = await addRestrictData(data, 'sensitive') as Response
    setIsSensitiveLoading(false)

    if (error) {
      notifyError(response.data.message)
    } else {
      notifySuccess(response.data.message)
      clearInputSensitive()
      handleGetRestrictData('sensitive')
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
      notifySuccess(response.data.message)
      handleGetRestrictData(record?.type)
    }
  }

  const onChangeAddDataPersonal = useCallback((e: any) => {
    setAddDataPersonal(!(e.target.value.trim().length === 0)
      ? e.target.value
      : e.target.value.trim())
  }, [setAddDataPersonal])

  const onChangeAddDataSensitive = useCallback((e: any) => {
    setAddDataSensitive(!(e.target.value.trim().length === 0)
      ? e.target.value
      : e.target.value.trim(),)
  }, [setAddDataSensitive])

  const clearInputPersonal = useCallback(() => {
    setAddDataPersonal('')
  }, [setAddDataPersonal])

  const clearInputSensitive = useCallback(() => {
    setAddDataSensitive('')
  }, [setAddDataSensitive])

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
      <h1>Restrict Data List</h1>
      <RestrictDataContainer>
        <RestrictDataCard>
          <h2>Personal Data</h2>
          {
            <CardContent>
              <Table
                key='personal'
                columns={columns}
                dataSource={convertData(restrictDataList?.personal, 'personal')}
                scroll={{ y: 300 }}
                style={{ width: '400px' }}
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
          <h2>Sensitive Data</h2>
          {
            <CardContent>
              <Table
                key="sensitive"
                columns={columns}
                dataSource={convertData(restrictDataList?.sensitive, 'sensitive')}
                scroll={{ y: 300 }}
                style={{ width: '400px' }}
                rowKey="id"
                pagination={{
                  style: {backgroundColor: '#ffffff', borderRadius: '5px'},
                }}
              />
              <div style={{ background: '#27293D', borderRadius: '5px', padding: '0.5rem', marginLeft: '1rem' }}>
                <h3>Add data</h3>
                <div style={{ background: '#27293D', borderRadius: '5px', padding: '0.5rem' }}>
                  <Input placeholder='Data name' value={addDataSensitive} style={{ marginBottom: '1rem' }} onChange={onChangeAddDataSensitive} />
                  <Button onClick={handleAddSensitiveData} disabled={isSensitiveLoading}>{isSensitiveLoading ? <LoadingOutlined /> : 'Confirm'}</Button>
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
