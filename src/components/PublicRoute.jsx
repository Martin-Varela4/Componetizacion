import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { ROUTES } from '../routes'

// Para login/registro: si ya hay sesión, redirige a la pantalla principal
export default function PublicRoute({ children }) {
  const { isAuthenticated, isInitializing } = useAuth()
  const location = useLocation()

  if (isInitializing) return <p>Cargando sesión…</p>

  if (isAuthenticated) {
    return <Navigate to={location.state?.from?.pathname || ROUTES.USERS} replace />
  }

  return children
}
