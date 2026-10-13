import axios from 'axios'

export const TOKEN_KEY = 'token'

// localStorage puede no estar disponible (modo privado, bloqueado...)
export const tokenStorage = {
  get() {
    try { return localStorage.getItem(TOKEN_KEY) } catch { return null }
  },
  set(token) {
    try { localStorage.setItem(TOKEN_KEY, token) } catch { /* sin almacenamiento */ }
  },
  remove() {
    try { localStorage.removeItem(TOKEN_KEY) } catch { /* sin almacenamiento */ }
  },
}

// La URL base incluye el prefijo /api del backend (ver Front/.env.example)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
})

// Adjunta el token automáticamente en cada request
api.interceptors.request.use((config) => {
  const token = tokenStorage.get()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Si el servidor responde 401 con una sesión activa (token vencido/inválido),
// avisa al AuthContext para que cierre la sesión.
let unauthorizedHandler = null
export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url === '/auth/login'
    if (error.response?.status === 401 && !isLoginRequest && tokenStorage.get()) {
      unauthorizedHandler?.()
    }
    return Promise.reject(error)
  },
)

export default api
