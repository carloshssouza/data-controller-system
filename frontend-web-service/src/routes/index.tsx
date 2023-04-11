import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard, Api, Login, Error } from '../pages'
import FirstRegister from '../pages/FirstRegister'
import RegisterApp from '../pages/RegisterApp'
import SuperRoute from './services/SuperRoute'
import Configuration from '../pages/Configuration'
import Navbar from '../components/Navbar'
import User from '../pages/User'
import RouteDbConnected from './services/RouteDbConnected'
import ProtectedRoute from './services/ProtectedRoute'

export default function routes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
            <FirstRegister />
        } />
        <Route path="/register-host" element={
          <RouteDbConnected>
            <RegisterApp />
          </RouteDbConnected>
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
        <Route path="/user" element={
          <SuperRoute>
            <Navbar/>
            <User />
          </SuperRoute>
        } />

        <Route path="/login" element={
          <RouteDbConnected>
            <Login />
          </RouteDbConnected>
        } />
        <Route path="*" element={
          <>
            <Error />
          </>      
        } />
      </Routes>
    </Router>
  )
}

