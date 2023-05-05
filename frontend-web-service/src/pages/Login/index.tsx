import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Form, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import { LoginContainer } from "./styles";
import { Container } from "../../GlobalStyles";
import { login, validateToken } from "../../api/services/Auth";

const Login = () => {
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const navigate = useNavigate()

  const handleLoginData = async (loginData: any) => {
    const response = await login(loginData)
    if(response.error) {
      notifyError(response.data.message)
    } else {
      notifySuccess("Login success")
      localStorage.setItem('token', response.access_token)
      navigate("/dashboard")
    }
  }

  const handleValidateToken = async () => {
    const response = await validateToken()
    if(response.error) {
      if(response.status === 401) {
        localStorage.removeItem('token')
      }
    } else {
      navigate("/dashboard")
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')){
      handleValidateToken()
    }
  }, [])

  return (
    <Container>
      <LoginContainer>
        <div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleLoginData}
            autoComplete="off"
          >
            <Form.Item
              label={<label style={{ color: 'white' }}>Email</label>}
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input type="email"/>
            </Form.Item>

            <Form.Item
              label={<label style={{ color: 'white' }}>Password</label>}
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
        <ToastContainer toastStyle={{ backgroundColor: "black", color: "white" }} />
      </LoginContainer>
    </Container>

  );
};

export default Login;
