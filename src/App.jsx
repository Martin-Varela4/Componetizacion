import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Users from './pages/User'
import RegisterForm from './pages/RegisterForm' 
import LoginForm from './pages/LoginForm'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Navigate to="/register" replace />} />

       
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/usuarios" element={<Users />} />
        
        
        
        <Route path="*" element={<h2>Página no encontrada - 404</h2>} />
      </Routes>
    </BrowserRouter>
  )
}
