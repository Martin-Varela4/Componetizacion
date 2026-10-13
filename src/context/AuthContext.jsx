import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { tokenStorage, setUnauthorizedHandler } from '../api/client'
import * as authApi from '../api/auth.api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => tokenStorage.get())
  const [user, setUser] = useState(null)
  // true mientras se confirma con el servidor que el token guardado sigue siendo válido
  const [isInitializing, setIsInitializing] = useState(() => !!tokenStorage.get())

  const logout = useCallback(() => {
    tokenStorage.remove()
    setToken(null)
    setUser(null)
  }, [])

  const login = useCallback(async (email, password) => {
    const { token: newToken, user: loggedUser } = await authApi.login(email, password)
    tokenStorage.set(newToken)
    setToken(newToken)
    setUser(loggedUser)
  }, [])

  // El interceptor de Axios avisa cuando el servidor devuelve 401
  useEffect(() => {
    setUnauthorizedHandler(logout)
    return () => setUnauthorizedHandler(null)
  }, [logout])

  // Al cargar la app, valida el token guardado y recupera el usuario
  useEffect(() => {
    if (!tokenStorage.get()) return
    let cancelled = false
    authApi
      .getMe()
      .then((me) => { if (!cancelled) setUser(me) })
      .catch(() => { /* 401: el interceptor cierra la sesión; otros errores: queda sin usuario */ })
      .finally(() => { if (!cancelled) setIsInitializing(false) })
    return () => { cancelled = true }
  }, [])

  const value = useMemo(
    () => ({ token, user, isAuthenticated: !!token && !!user, isInitializing, login, logout }),
    [token, user, isInitializing, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
