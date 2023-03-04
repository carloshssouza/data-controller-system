import React, { useState, useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import isAuthenticated from './auth';
import isDbConnected from './dbConnection';
import ConfigurationContext from '../../context/Configuration/ConfigurationContext';

export default function SuperRoute({ children }: any) {
  const [dbConnection, setDbConnection]= useState(localStorage.getItem('dbConnection'))

  useEffect(() => {
    if(!localStorage.getItem('dbConnection')) {
      isDbConnected().then((result: any) => {
        localStorage.setItem('dbConnection', result)
        setDbConnection(result)
      });
    }
  }, []);

  if (dbConnection === null) {
    return null; // or you could return a loading indicator
  }
  if(!dbConnection) {
    return <Navigate to="/first-register" />;
  } else if(dbConnection) {
    if(isAuthenticated()) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }

  return null; // fallback case
}
