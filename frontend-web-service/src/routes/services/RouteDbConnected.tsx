import React from 'react'
import { Navigate } from 'react-router-dom'
import isDbConnected from './dbConnection';

export default async function RouteDbConnected({children} : any) {
  return await isDbConnected() ? children : <Navigate to="/first-register" />
}