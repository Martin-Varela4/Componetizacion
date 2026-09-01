import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Users from './pages/User'
import RegisterForm from './pages/RegisterForm' 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Navigate to="/register" replace />} />

       
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/usuarios" element={<Users />} />
        
        
        <Route path="*" element={<h2>Página no encontrada - 404</h2>} />
      </Routes>
    </BrowserRouter>
  )
}
