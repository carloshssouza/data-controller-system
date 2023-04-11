import { Result, Button } from 'antd';

const Error: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => window.history.back()}>
          Go Back
        </Button>
      }
      style={{ color: '#fff' }} // add custom style for text color
    />
  );
};

export default Error;