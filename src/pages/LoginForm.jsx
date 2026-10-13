import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { InputField } from '../components/InputField'
import { ErrorMessage } from '../components/ErrorMessage'
import { SubmitButton } from '../components/SubmitButton'
import { loginSchema } from '../schemes/loginSchema'
import { useAuth } from '../context/AuthContext'
import { getErrorMessage } from '../api/errors'
import { ROUTES } from '../routes'

export default function LoginForm() {
  const location = useLocation()
  const registeredEmail = location.state?.registeredEmail

  const [form, setForm] = useState({ email: registeredEmail || '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { login } = useAuth()

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const values = await loginSchema.validate(form)
      await login(values.email, values.password)
      // PublicRoute redirige solo cuando la sesión queda iniciada
    } catch (err) {
      setError(getErrorMessage(err, 'Ocurrió un error al iniciar sesión'))
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={styles.form}>
      <h2>Iniciar sesión</h2>

      {registeredEmail && <p style={styles.info}>Cuenta creada. Ya podés iniciar sesión.</p>}

      <InputField
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        autoComplete="email"
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
      <SubmitButton isLoading={loading} text="Iniciar sesión" loadingText="Ingresando..." />

      <p>¿No tenés cuenta? <Link to={ROUTES.REGISTER}>Registrate</Link></p>
    </form>
  )
}

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px', margin: '40px auto' },
  info: { color: 'green', margin: 0, fontSize: '0.9rem' },
}
