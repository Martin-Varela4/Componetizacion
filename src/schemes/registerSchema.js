import * as Yup from "yup"
import normalizedSchemaMessages from "../schemes/normalizedSchemaMessages"

export const registerSchema = Yup.object({
    email: Yup.string()
        .trim()
        .email(normalizedSchemaMessages.error.email)
        .required("El correo electrónico es obligatorio"),

    passwod: Yup.string()    
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(11, "La contraseña no puede tener mas de 11 caracteres")
        .required("La contraseña es obligatoria"),
})