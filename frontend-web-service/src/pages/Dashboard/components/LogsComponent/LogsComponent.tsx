import { useCallback, useEffect, useState } from 'react'
import { LogsContainer, LogsItem, ModalBodyContainer, ModalDataItem} from './styles'
import { IErrorLog } from '../../../../interfaces/ErrorLog/interfaces'
import { Modal } from 'antd'

interface LogsComponentProps {
  logs: IErrorLog[]
}

export default function LogsComponent({ logs }: LogsComponentProps) {

  const [logsSorted, setLogsSorted] = useState<IErrorLog[]>([])
  const [leakedData, setLeakedData] = useState<any>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [shouldReverse, setShouldReverse] = useState<boolean>(true) // New state variable

  const selectLeakedData = useCallback((log: any) => {
    if (log.leakedData.length > 0) {
      setLeakedData(log.leakedData)
      setOpenModal(true)
      setShouldReverse(true) // Set shouldReverse to false when modal is opened
    }
  }, [])

  const formatLeakedData = (type: string) => {
    return leakedData.filter((data: any) => data.type === type)
  }
  const closeModal = () => {
    setOpenModal(false)
    setShouldReverse(false) // Set shouldReverse to true when modal is closed
  }

  useEffect(() => {
      setLogsSorted(logs.reverse())
  }, [logs])

  return (
    <LogsContainer>
      {
        logsSorted && logsSorted.length && logsSorted.map((log: any) => {
          return (
            <LogsItem key={log._id} level={log.level} onClick={(e) => selectLeakedData(log)}>
              <div>{log.createdAt.split('T')[0]} {log.createdAt.split('T')[1].split('.')[0]}</div>
              <div>Route Name: {log.routeName}</div>
              <div>Route Id: {log.routeId}</div>
              <div>Level: {log.level}</div>
              <div>Description: {log.description}</div>
              <div>Amount Data: {log.leakedData.length}</div>
            </LogsItem>
          )
        })
      }
        <Modal
        title="Leaked Data"
        open={openModal}
        onCancel={closeModal}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        className="modal-custom"
      >
        <ModalBodyContainer>
          <ModalDataItem>
            <h4>Personal data</h4>
            {
              openModal && leakedData && leakedData.length > 0 && formatLeakedData('personal').map((data: any) => {
                return (
                  <div key={data._id}>
                    <p>{data.name}</p>
                  </div>
                )
              })
            }
            {
              openModal && leakedData && leakedData.length > 0 && formatLeakedData('personal').length === 0 && <p>No personal data leaked</p>
            }
          </ModalDataItem>
          <ModalDataItem>
            <h4>Sensible data</h4>
            {
              openModal && leakedData && leakedData.length > 0 && formatLeakedData('sensible').map((data: any) => {
                return (
                  <div key={data._id}>
                    <p>{data.name}</p>
                  </div>
                )
              })
            }
            {
              openModal && leakedData && leakedData.length > 0 && formatLeakedData('sensible').length === 0 && <p>No sensible data leaked</p>
            }
          </ModalDataItem>
        </ModalBodyContainer>
      </Modal>
      
    </LogsContainer>
  )
}
