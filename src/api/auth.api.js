import api from './client'

// POST /api/users/register -> { data: { id, nombre, email, creadoEn } }
export async function register({ nombre, email, password }) {
  const { data } = await api.post('/users/register', { nombre, email, password })
  return data.data
}

// POST /api/auth/login -> { data: { token, user } }
export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password })
  return data.data
}

// GET /api/auth/me -> { data: user }
export async function getMe() {
  const { data } = await api.get('/auth/me')
  return data.data
}
