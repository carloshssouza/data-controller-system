import { LoadingOutlined } from '@ant-design/icons';
import { StyledButton } from './styles';

interface ProxyButtonProps {
  onClick: () => Promise<void>;
  disabled?: boolean;
  isLoading: boolean;
  isApplicationHostStarted: boolean;
  isProxyStarted: boolean;
}

const ProxyButton = ({ onClick, isLoading, isApplicationHostStarted, isProxyStarted }: ProxyButtonProps) => {
  return (
    <StyledButton 
      type="primary" 
      onClick={onClick} 
      disabled={!isApplicationHostStarted ? true :
        isLoading ? true : false
      }
      isProxyStarted={isProxyStarted} 
    >
      {
        isLoading ? <LoadingOutlined /> : (isProxyStarted ? 'Stop proxy server' : 'Start proxy server')
      }
      
    </StyledButton>
  );
};

export default ProxyButton;
