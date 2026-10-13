import { useCallback, useEffect, useState } from 'react'
import UserList from '../components/UserList'
import { ErrorMessage } from '../components/ErrorMessage'
import { getUsers } from '../api/users.api'
import { getErrorMessage, isCanceled } from '../api/errors'
import { useAuth } from '../context/AuthContext'

export default function Users() {
  const { user, logout } = useAuth()
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'
  const [error, setError] = useState(null)

  const loadUsers = useCallback(async (signal) => {
    setStatus('loading')
    setError(null)
    try {
      const data = await getUsers({ signal })
      setUsers(data)
      setStatus('success')
    } catch (err) {
      if (isCanceled(err)) return
      setError(getErrorMessage(err, 'No se pudieron cargar los usuarios'))
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    loadUsers(controller.signal)
    return () => controller.abort()
  }, [loadUsers])

  return (
    <main className="page">
      <header className="page-header">
        <h1>Lista de Usuarios</h1>
        <div className="page-header-actions">
          {user && <span>Sesión: {user.nombre}</span>}
          <button className="btn" onClick={() => loadUsers()}>Recargar</button>
          <button className="btn" onClick={logout}>Cerrar sesión</button>
        </div>
      </header>

      {status === 'loading' && <p>Cargando usuarios…</p>}

      {status === 'error' && (
        <div>
          <ErrorMessage message={error} />
          <button className="btn" onClick={() => loadUsers()}>Reintentar</button>
        </div>
      )}

      {status === 'success' && users.length === 0 && (
        <p>No hay usuarios cargados todavía.</p>
      )}

      {status === 'success' && users.length > 0 && <UserList users={users} />}
    </main>
  )
}
