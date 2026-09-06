import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import DashboardLayout from './pages/DashboardLayout.jsx'
import { ChangePassword } from './components/ChangePassword.jsx'

import './App.css'

function App() {
  const session = JSON.parse(localStorage.getItem('session') || 'null')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={session ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/reset-password" element={<ChangePassword />} />
        <Route path="/dashboard" element={session ? <DashboardLayout /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to={session ? "/dashboard" : "/"} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
