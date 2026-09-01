import { useState } from 'react'

function InputField({ label, type, name, value, onChange, autoComplete }) {
  return (
    <label style={styles.label}>
      {label}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required
        style={styles.input}
      />
    </label>
  )
}


function ErrorMessage({ message }) {
  if (!message) return null 
  return <p style={styles.error}>{message}</p>
}


function SubmitButton({ isLoading, text, loadingText }) {
  return (
    <button type="submit" disabled={isLoading} style={styles.button}>
      {isLoading ? loadingText : text}
    </button>
  )
}


export default function RegisterForm() {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }
    setLoading(true)
    setError(null)
    //  lógica de conexión con back
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Registrarse</h2>

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

      <SubmitButton 
        isLoading={loading} 
        text="Registrarse" 
        loadingText="Registrando..." 
      />
    </form>
  )
}


const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '320px',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '0.9rem',
  },
  input: {
    display: 'block',
    width: '100%',
    marginTop: '4px',
    padding: '8px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    margin: 0,
    fontSize: '0.85rem',
  },
}
