import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import isDbConnected from './dbConnection';

export default function RouteDbConnected({ children }: any) {
  const [dbConnection, setDbConnection] = useState(localStorage.getItem('dbConnection'))
  const navigate = useNavigate();

  useEffect(() => {
    isDbConnected().then((result: any) => {
      localStorage.setItem('dbConnection', result)
      if (!result) {
        navigate('/');
      } else {
        setDbConnection(result);
      }
    });
  }, [navigate])

  if (!dbConnection) {
    // We haven't determined the connection status yet
    return null;
  }

  if (!dbConnection) {
    // The database connection failed, so navigate to the home page
    return <Navigate to="/" />;
  }

  // The database connection succeeded, so render the children
  return children;
}
