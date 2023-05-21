import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard, Api, Login, Error } from '../pages'
import ProtectedRoute from './services/ProtectedRoute'
import Configuration from '../pages/Configuration'
import Navbar from '../components/Navbar'
import User from '../pages/User'
import Users from '../pages/Users'

export default function routes() {
  return (
    <Router>
      <Routes>
        <Route path="/api" element={
          <ProtectedRoute>
            <Navbar />
            <Api />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Navbar />
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/config" element={
          <ProtectedRoute>
            <Navbar />
            <Configuration />
          </ProtectedRoute>
        } />
        <Route path="/user" element={
          <ProtectedRoute>
            <Navbar />
            <User />
          </ProtectedRoute>
        } />

        <Route path="/" element={
          <Login />
        } />
        {
          localStorage.getItem('type') === 'admin' && (
            <Route path="/users" element={
              <ProtectedRoute>
                <Navbar />
                <Users />
              </ProtectedRoute>
            } />
          )
        }
        <Route path="*" element={
          <>
            <Error />
          </>
        } />
      </Routes>
    </Router>
  )
}

