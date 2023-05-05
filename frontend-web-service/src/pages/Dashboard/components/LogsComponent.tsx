import { IErrorLog } from '..'
import { LogsContainer, LogsItem } from './styles'

interface LogsComponentProps {
  logs: IErrorLog[]
}

export default function LogsComponent({ logs }: LogsComponentProps) {
  return (
    <LogsContainer>
      {
        logs && logs.length && logs?.map((log: any) => {
          return (
            <LogsItem level={log.level}>
              <div>{log.createdAt}</div>
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
