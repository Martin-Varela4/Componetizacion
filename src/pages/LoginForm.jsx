import { useState } from 'react'
import { InputField } from '../components/InputField'
import { ErrorMessage } from '../components/ErrorMessage'
import { SubmitButton } from '../components/SubmitButton'
import { useAuth } from '../hook/useAuth'

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [ token, isAuthenticated, login, logout] = useAuth()

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    // Lógica backend
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px' }}>
      <h2>Iniciar Sesión</h2>

      <InputField
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        autoComplete="username"
      />

      <InputField
        label="Contraseña"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        autoComplete="current-password"
      />

      <ErrorMessage message={error} />

      <SubmitButton
        isLoading={loading}
        text="Ingresar"
        loadingText="Ingresando..."
      />
    </form>
  )
}