import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard, Api, Login, Error } from '../pages'
import FirstRegister from '../pages/FirstRegister'
import RegisterApp from '../pages/RegisterApp'
import ProtectedRoute from '../ProtectedRoute'

export default function routes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
            <FirstRegister />
        } />
        <Route path="/register-host" element={
          <ProtectedRoute>
            <RegisterApp />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/api" element={
          <ProtectedRoute>
            <Api />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={
          <Error />
        } />
      </Routes>
    </Router>
  )
}

