import React, { useEffect } from 'react'
import { StyledButton } from './styles'
import { LoadingOutlined } from '@ant-design/icons';

interface StopProxyButtonProps {
  isProxyStarted: boolean;
  isLoading: boolean;
  stopProxy: () => Promise<void>;
}

export default function StopProxyButton({isProxyStarted, isLoading, stopProxy}: StopProxyButtonProps) {
  
  return (
    <StyledButton 
      type="primary"
      disabled={!isProxyStarted || isLoading}
      typeButton='stop'
      onClick={stopProxy}
    >
      {isLoading ? <LoadingOutlined /> : 'Stop proxy'}
    </StyledButton>
  )
}
