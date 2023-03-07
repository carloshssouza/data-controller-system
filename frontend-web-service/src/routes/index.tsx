import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard, Api, Login, Error } from '../pages'
import FirstRegister from '../pages/FirstRegister'
import RegisterApp from '../pages/RegisterApp'
import SuperRoute from './services/SuperRoute'
import Configuration from '../pages/Configuration'
import Navbar from '../components/Navbar'

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
        <Route path="/api" element={
          <SuperRoute>
            <Navbar/>
            <Api />
          </SuperRoute>
        } />
        <Route path="/dashboard" element={
          <SuperRoute>
            <Navbar/>
            <Dashboard/>
          </SuperRoute>
        } />
        <Route path="/config" element={
          <SuperRoute>
            <Navbar/>
            <Configuration />
          </SuperRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={
          <>
            <Navbar/>
            <Error />
          </>      
        } />
      </Routes>
    </Router>
  )
}

