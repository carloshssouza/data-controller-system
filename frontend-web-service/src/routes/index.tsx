import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard, Api, Login, Error } from '../pages'
import FirstRegister from '../pages/FirstRegister'
import RegisterApp from '../pages/RegisterApp'
import SuperRoute from './services/SuperRoute'

export default function routes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
            <FirstRegister />
        } />
        <Route path="/register-host" element={
          <SuperRoute>
            <RegisterApp />
          </SuperRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/api" element={
          <SuperRoute>
            <Api />
          </SuperRoute>
        } />
        <Route path="/dashboard" element={
          <SuperRoute>
            <Dashboard />
          </SuperRoute>
        } />
        <Route path="*" element={
          <Error />
        } />
      </Routes>
    </Router>
  )
}

