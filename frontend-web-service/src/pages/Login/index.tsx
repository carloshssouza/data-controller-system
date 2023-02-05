import React, { useCallback, useEffect, useState } from "react";
import Input from "../../components/Input";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const onChangeLogin = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setLoginData((prevLoginData) => ({ ...prevLoginData, [name]: value }));
  }, [loginData])

  const handleLoginData = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(loginData)
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
    </div>
  );
};

export default Login;
