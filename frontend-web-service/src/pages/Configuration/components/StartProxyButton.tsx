import { LoadingOutlined } from '@ant-design/icons';
import { StyledButton } from './styles';
import { Spin } from 'antd';

interface StartProxyButtonProps {
  isProxyStarted: boolean;
  isLoading: boolean;
  isApplicationHostStarted: boolean;
  startProxy: () => Promise<void>;
}

const StartProxyButton = ({isProxyStarted, isLoading, isApplicationHostStarted, startProxy}: StartProxyButtonProps) => {
  return (
    <StyledButton 
      type="primary"
      typebutton="start" 
      disabled={isProxyStarted || isLoading || !isApplicationHostStarted}
      onClick={startProxy}
    >
      { isLoading ? <LoadingOutlined /> : 'Start proxy'}
    </StyledButton>
  );
};

export default StartProxyButton;
