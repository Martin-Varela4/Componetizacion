import * as Yup from 'yup'

// Reglas alineadas con el backend (user.validation.ts)
export const registerSchema = Yup.object({
  nombre: Yup.string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede tener más de 100 caracteres')
    .required('El nombre es obligatorio'),

  email: Yup.string()
    .trim()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio'),

  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(72, 'La contraseña no puede tener más de 72 caracteres')
    .required('La contraseña es obligatoria'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Repetí la contraseña'),
})
