import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { ErrorMessage } from '../components/ErrorMessage';
import { SubmitButton } from '../components/SubmitButton';
import { loginSchema } from '../schemes/loginSchema';
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  // Redirige cuando el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/users', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await loginSchema.validate(form);
      await login(form.email, form.password);
    } catch (err) {
      setError(
        err.response?.data?.message || // error del backend (axios)
        err.message ||                 // error de validación (Yup)
        'Ocurrió un error al iniciar sesión'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <InputField
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <InputField
        label="Contraseña"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <ErrorMessage message={error} />
      <SubmitButton loading={loading}>Iniciar sesión</SubmitButton>
    </form>
  );
}