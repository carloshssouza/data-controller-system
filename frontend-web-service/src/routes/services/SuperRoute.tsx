import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import isAuthenticated from './auth';
import isDbConnected from './dbConnection';

export default function SuperRoute({ children }: any) {
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);
  console.log("teste")

  useEffect(() => {
    isDbConnected().then((result: any) => setDbConnected(result));
  }, []);

  useEffect(() => {
    console.log(dbConnected)
  }, [dbConnected])

  if (dbConnected === null) {
    return null; // or you could return a loading indicator
  }
  if(!dbConnected) {
    return <Navigate to="/first-register" />;
  } else if(dbConnected) {
    if(isAuthenticated()) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }

  return null; // fallback case
}
