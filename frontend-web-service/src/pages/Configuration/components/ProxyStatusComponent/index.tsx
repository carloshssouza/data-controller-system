import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { ProxyStatusContainer, ProxyStatusItem } from './styles'

interface ProxyStatusComponentProps {
  applicationHostExist: boolean
}

export default function ProxyStatusComponent({ applicationHostExist }: ProxyStatusComponentProps) {
  const [proxyStatus, setProxyStatus] = useState(false)

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL as string)

    socket.on('proxy-status', (message) => {
      console.log('proxy-status', message)
      setProxyStatus(message.status)
    });
    if(applicationHostExist){
      setProxyStatus(true)
    }

  }, [])

  return (
    <ProxyStatusContainer>
      <h3>Proxy Status</h3>
      <ProxyStatusItem
        isRunning={proxyStatus}
      >
        <div>{proxyStatus ? 'Proxy server running' : 'Proxy server not running(host target is required)'}</div>
        <div>{proxyStatus ? <CheckOutlined color='green' style={{color: 'green'}}/> : <CloseOutlined style={{color: 'red'}}/>}</div>
      </ProxyStatusItem>
    </ProxyStatusContainer>
  )
}
