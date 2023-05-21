import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { LoginContainer } from "./styles";
import { Container } from "../../GlobalStyles";
import { validateToken } from "../../api/services/Auth";
import { Response } from "../../api/axios";
import LoginFormComponent from "./components/LoginFormComponent/LoginFormComponent";

const Login = () => {
  const notifyError = (message: string) => toast.error(message);
  const navigate = useNavigate()

  const handleValidateToken = async () => {
    const { response, error } = await validateToken() as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      navigate("/dashboard")
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      handleValidateToken()
    }
  }, [])

  return (
    <Container>
      <LoginContainer>
        <LoginFormComponent />
        <ToastContainer toastStyle={{ backgroundColor: "black", color: "white" }} />
      </LoginContainer>
    </Container>

  );
};

export default Login;
