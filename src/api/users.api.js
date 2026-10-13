import api from './client'

// GET /api/users (requiere token) -> { data: [user], meta: { total } }
export async function getUsers({ signal } = {}) {
  const { data } = await api.get('/users', { signal })
  return data.data
}
