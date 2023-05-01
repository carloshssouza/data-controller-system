import React, { useEffect } from 'react'
import { ConfigurationItemRestrictData, RestrictDataCard, RestrictDataContainer, UniqueRestrictDataItem  } from './styles'
import { Button, Form, Input, Modal, Popconfirm, Table } from 'antd'
import api from '../../../../api/axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Icon from '@ant-design/icons/lib/components/Icon'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

interface IRestrictDataList {
  personal: string[] | []
  sensible: string[] | []
}

interface RestrictDataItemProps {
  restrictDataPersonal: []
  restrictDataSensible: []
}

export default function RestrictDataItem({ restrictDataPersonal, restrictDataSensible }: RestrictDataItemProps) {
  const navigate = useNavigate()

  const [showFormPersonal, setShowFormPersonal] = React.useState<boolean>(false)
  const [showFormSensible, setShowFormSensible] = React.useState<boolean>(false)
  const [selectedRecord, setSelectedRecord] = React.useState<any>();
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  useEffect(() => {
    console.log(restrictDataPersonal)
    console.log(restrictDataSensible)
  }, [])

  const convertData = (restrictDataType: []) => {
    const data = []
    for (const item of restrictDataType) {
      data.push({ name: item })
    }
    return data
  }

  const updateRestrictData = async (data: any) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }

      const response = await api.put(`${import.meta.env.VITE_BASE_URL}/configuration/restrict-data`, data, config)
      if (response.status !== 200) {
        throw new Error(response.data.message)
      } else {
        notifySuccess(response.data.message)
      }
    } catch (error: any) {
      notifyError(error.response.data.message)
    } 
  }

  const handleUpdate = (record: any) => {
    // Open the update modal and pass the record data
    setShowFormPersonal(true);
    setSelectedRecord(record);
  };

  const deleteRestrictData = async(name: string ) => {
    try {
      const config = {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.delete(`${import.meta.env.VITE_BASE_URL}/configuration/restrict-data/${name}`, config)
      if (response.status !== 200) {
        throw new Error(response.data.message)
      } else {
        notifySuccess(response.data.message)
        // update restrict data
      }
    } catch (error: any) {
      if(error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.response.data.message)
    }
  }

  const columns = [
    {
      title: "Name data",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: any) => (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <EditOutlined style={{color: '#4096FF'}} onClick={() => handleUpdate(record.name)}/>
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={() => deleteRestrictData(record.name)}
          >
            <DeleteOutlined style={{color: '#FF7875'}}/>
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
          <h3>Personal:</h3>
          {
            <Table columns={columns} dataSource={convertData(restrictDataPersonal)} scroll={{ y: 300 }} style={{width: '300px'}}/>
          }
        </RestrictDataCard>
        <RestrictDataCard>
          <h3>Sensible:</h3>
          {
            <Table columns={columns} dataSource={convertData(restrictDataSensible)} scroll={{ y: 300 }} style={{width: '300px'}}/>
          }
        </RestrictDataCard>
        <Modal
          title="Update Restrict Data"
          open={showFormPersonal}
          onCancel={() => setShowFormPersonal(false)}
          cancelButtonProps={{style: {display: 'none'}}}
          okButtonProps={{ style: { display: 'none' } }}
        >
           <Form
            style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={updateRestrictData}
            autoComplete="off"
          >
            <Form.Item
              label="Name data"
              name="name"
              rules={[{ required: true, message: 'Name data is required' }]}
            >
              <Input defaultValue={selectedRecord?.name}/>
            </Form.Item>
            <Button type="primary"  htmlType="submit">Confirm</Button>
          </Form>
        </Modal>
      </RestrictDataContainer>

    </ConfigurationItemRestrictData>
  )
}
