import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './auth/Login.jsx';
import Register from './auth/Register.jsx';
import AdminDashboard from './admin/Dashboard.jsx';
import Alerts from './admin/Alerts.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin-alerts' element={<Alerts/>}/>
      </Routes>
    </Router>
  )
}

export default App;
