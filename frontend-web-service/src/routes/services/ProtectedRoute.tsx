import React from 'react'
import { Navigate } from 'react-router-dom'
import isAuthenticated from './auth';

export default function ProtectedRoute({children} : any) {
  console.log(localStorage.getItem('type'))
  return isAuthenticated() ? children : <Navigate to="/" />
}