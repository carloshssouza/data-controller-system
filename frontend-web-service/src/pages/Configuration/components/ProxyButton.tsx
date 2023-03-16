import { LoadingOutlined } from '@ant-design/icons';
import { StyledButton } from './styles';

interface ProxyButtonProps {
  onClick: () => Promise<void>;
  isActive: boolean;
  disabled?: boolean;
  isLoading: boolean;
  isApplicationHostStarted: boolean;
}

const ProxyButton = ({ onClick, isActive, disabled, isLoading, isApplicationHostStarted }: ProxyButtonProps) => {
  return (
    <StyledButton 
      type="primary" 
      onClick={onClick} 
      disabled={!isApplicationHostStarted ? true :
        isLoading ? true : false
      }
      isActive={isActive} 
    >
      {
        isLoading ? <LoadingOutlined /> : (isActive ? 'Stop proxy server' : 'Start proxy server')
      }
      
    </StyledButton>
  );
};

export default ProxyButton;
