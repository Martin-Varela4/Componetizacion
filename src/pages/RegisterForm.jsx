import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { InputField } from '../components/InputField'
import { ErrorMessage } from '../components/ErrorMessage'
import { SubmitButton } from '../components/SubmitButton'
import { registerSchema } from '../schemes/registerSchema'
import { register } from '../api/auth.api'
import { getErrorMessage } from '../api/errors'
import { ROUTES } from '../routes'

export default function RegisterForm() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const values = await registerSchema.validate(form)
      const user = await register({
        nombre: values.nombre,
        email: values.email,
        password: values.password,
      })
      navigate(ROUTES.LOGIN, { replace: true, state: { registeredEmail: user.email } })
    } catch (err) {
      setError(getErrorMessage(err, 'No se pudo completar el registro'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={styles.form}>
      <h2>Registrarse</h2>

      <InputField
        label="Nombre"
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        autoComplete="name"
      />

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
        autoComplete="new-password"
      />

      <InputField
        label="Repetir contraseña"
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
        autoComplete="new-password"
      />

      <ErrorMessage message={error} />

      <SubmitButton isLoading={loading} text="Registrarse" loadingText="Registrando..." />

      <p>¿Ya tenés cuenta? <Link to={ROUTES.LOGIN}>Iniciá sesión</Link></p>
    </form>
  )
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '320px',
    margin: '40px auto',
  },
}
