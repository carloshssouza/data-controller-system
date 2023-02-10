import React, { useCallback, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../api/axios'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'
import { useNavigate } from "react-router-dom";
import { LoginContainer } from "./styles";

const Login = () => {
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const onChangeLogin = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setLoginData((prevLoginData) => ({ ...prevLoginData, [name]: value }));
  }, [loginData])

  const handleLoginData = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const response = await api.post(`${import.meta.env.VITE_BASE_URL}/login`, loginData)
      console.log(response)
      if (response.status === 401) {
        throw new Error("Email or password invalid")
      } else {
        notifySuccess("Login success")
        localStorage.setItem('token', response.data.access_token)
        navigate("/dashboard")
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  return (
    <LoginContainer>
      <Form>
        <FormGroup>
          <Label
            for="Email"
            hidden
          >
            Email
          </Label>
          <Input
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            onChange={onChangeLogin}
          />
        </FormGroup>
        <FormGroup>
          <Label
            for="Password"
            hidden
          >
            Password
          </Label>
          <Input
            id="email"
            name="password"
            placeholder="Password"
            type="password"
            onChange={onChangeLogin}
          />
        </FormGroup>
        <Button color="primary" onClick={handleLoginData}>
          LOGIN
        </Button>
      </Form>
      <ToastContainer toastStyle={{backgroundColor: "black", color: "white"}}/>
    </LoginContainer>
  );
};

export default Login;
