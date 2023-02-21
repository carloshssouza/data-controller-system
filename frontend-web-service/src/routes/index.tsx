import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Dashboard, Api, Login, Error } from '../pages'
import FirstRegister from '../pages/FirstRegister'
import RegisterApp from '../pages/RegisterApp'

export default function routes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstRegister/>}/>
        <Route path="/register-host" element={<RegisterApp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/api" element={<Api/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="*" element={<Error/>} />
      </Routes>
    </Router>
  )
}

