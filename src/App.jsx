import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import RegisterForm from './pages/RegisterForm'
import LoginForm from './pages/LoginForm'
import Users from './pages/User'
import { ROUTES } from './routes'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ProtectedRoute envía a /login si no hay sesión */}
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.USERS} replace />} />
          <Route path={ROUTES.REGISTER} element={<PublicRoute><RegisterForm /></PublicRoute>} />
          <Route path={ROUTES.LOGIN} element={<PublicRoute><LoginForm /></PublicRoute>} />
          <Route
            path={ROUTES.USERS}
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h2>Página no encontrada - 404</h2>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
