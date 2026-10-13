import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { ROUTES } from '../routes'

// Protección VISUAL: oculta pantallas a quien no inició sesión.
// La seguridad real de los datos la aplica el backend (middleware requireAuth).
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isInitializing } = useAuth()
  const location = useLocation()

  if (isInitializing) return <p>Cargando sesión…</p>

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />
  }

  return children
}
