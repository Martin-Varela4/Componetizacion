// Convierte cualquier error (Yup, Axios, otro) en un mensaje legible para la UI.
export function getErrorMessage(err, fallback = 'Ocurrió un error inesperado') {
  // Error de validación de Yup (formulario)
  if (err?.name === 'ValidationError' && err.message) return err.message

  const data = err?.response?.data

  // El backend devolvió errores por campo: { message, errors: [{ campo, mensaje }] }
  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors.map((e) => e.mensaje).join(' ')
  }

  // El backend devolvió un mensaje: { message }
  if (data?.message) return data.message

  // Hubo respuesta pero sin el formato esperado
  if (err?.response) return fallback

  // No hubo respuesta: servidor caído, CORS, URL incorrecta o timeout
  if (err?.request) {
    return 'No se pudo conectar con el servidor. Verificá que el backend esté en ejecución.'
  }

  return err?.message || fallback
}

// Petición cancelada a propósito (AbortController): no es un error para el usuario
export const isCanceled = (err) => err?.code === 'ERR_CANCELED'
