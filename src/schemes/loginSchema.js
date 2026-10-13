import * as Yup from 'yup'

// En el login NO se valida longitud de contraseña: eso lo decide el servidor.
export const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio'),

  password: Yup.string().required('La contraseña es obligatoria'),
})
