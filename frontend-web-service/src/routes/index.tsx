import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Dashboard, Api, Login, Error } from '../pages'

export default function routes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/api" element={<Api/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="*" element={<Error/>} />
      </Routes>
    </Router>
  )
}

