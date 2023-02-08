import React, { useCallback, useEffect, useState } from "react";
import Input from "../../components/Input";
import { loginAuthUser } from "../../api/services/Login";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../api/axios'

const Login = () => {
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);  
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
      if(response.status === 401) {
        throw new Error("Email or password invalid")
      } else {
        notifySuccess("Login success")
        //navigate dashboard
      }
    } catch (error: any) {
      notifyError(error.message)
    }
  }

  return (
    <div style={{ backgroundColor: 'red' }}>
      <div style={{ backgroundColor: "yellow" }}>
        <Input
          width="200"
          placeholder="Email"
          type="email"
          name="email"
          onChange={(event)=> onChangeLogin(event)}
          required
        />
        <Input
          width="200"
          placeholder="Password"
          type="password"
          name="password"
          onChange={(event)=> onChangeLogin(event)}
          required
        />
      </div>

      <button onClick={(event) => handleLoginData(event)}>Register</button>
      <ToastContainer/>
    </div>
  );
};

export default Login;
