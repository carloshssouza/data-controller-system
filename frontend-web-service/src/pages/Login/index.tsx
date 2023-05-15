import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { LoginContainer } from "./styles";
import { Container } from "../../GlobalStyles";
import { validateToken } from "../../api/services/Auth";
import { Response } from "../../api/axios";
import RegisterFormComponent from "./components/RegisterFormComponent/RegisterFormComponent";
import LoginFormComponent from "./components/LoginFormComponent/LoginFormComponent";

const Login = () => {
  const notifyError = (message: string) => toast.error(message);
  const navigate = useNavigate()
  const [registerWindow, setRegisterWindow] = useState(false)

  const handleValidateToken = async () => {
    const { response, error } = await validateToken() as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      navigate("/dashboard")
    }
  }

  const onClickRegister = () => {
    setRegisterWindow((prev: boolean) => !prev)
  }

  const onClickBack = () => {
    setRegisterWindow(false)
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      handleValidateToken()
    }
  }, [])

  return (
    <Container>
      <LoginContainer>
        {
          registerWindow ? (
            <RegisterFormComponent onClickBack={onClickBack} />
          ) : (
            <LoginFormComponent onClickRegister={onClickRegister} />
          )
        }
        <ToastContainer toastStyle={{ backgroundColor: "black", color: "white" }} />
      </LoginContainer>
    </Container>

  );
};

export default Login;
