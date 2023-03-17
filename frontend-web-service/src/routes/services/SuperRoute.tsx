import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import isAuthenticated from './auth'
import isDbConnected from './dbConnection'

export default function SuperRoute({ children }: any) {
  const [dbConnectionChecked, setDbConnectionChecked] = useState(!!localStorage.getItem('dbConnection'))
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(isAuthenticated())

  useEffect(() => {
    if (!dbConnectionChecked) {
      isDbConnected().then((result: any) => {
        localStorage.setItem('dbConnection', result)
        setDbConnectionChecked(true)
      })
    }
  }, [dbConnectionChecked])

  useEffect(() => {
    setIsAuthenticatedUser(isAuthenticated())
  }, [])

  if (!dbConnectionChecked) {
    // The database connection status is not known yet, so render nothing
    return null
  }

  if (!localStorage.getItem('dbConnection')) {
    // The database connection failed, so navigate to the home page
    return <Navigate to="/" />
  }

  if (!isAuthenticatedUser) {
    // The user is not authenticated, so navigate to the login page
    return <Navigate to="/login" />
  }

  // The database connection and authentication succeeded, so render the children
  return children
}
