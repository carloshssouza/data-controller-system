import { useEffect, useState } from 'react'
import { IErrorLog } from '../..'
import { LogsContainer, LogsItem } from './styles'

interface LogsComponentProps {
  logs: IErrorLog[]
}

export default function LogsComponent({ logs }: LogsComponentProps) {

  const [logsSorted, setLogsSorted] = useState<IErrorLog[]>([])

  useEffect(() => {
    setLogsSorted(logs)
  }, [logs])

  return (
    <LogsContainer>
      {
        logsSorted && logsSorted.length && logsSorted.reverse().map((log: any) => {
          return (
            <LogsItem key={log._id} level={log.level}>
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
    </LogsContainer>
  )
}
