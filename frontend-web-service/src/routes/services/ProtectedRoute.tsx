import React from 'react'
import { Navigate } from 'react-router-dom'
import isAuthenticated from './auth';

export default function ProtectedRoute({children} : any) {
  return isAuthenticated() ? children : <Navigate to="/login" />
}