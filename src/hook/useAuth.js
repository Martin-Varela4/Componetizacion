import { useState } from 'react';
// Asegúrate de importar tu configuración de 'api' (por ejemplo axios)
// import api from '../api';

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Agregamos 'async' a la función
  const login = async (email, password) => {
    const { data } = await api.post("/users/login", { email, password });
    
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  // Agregamos la función logout para que no de error al exportarla
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // Creamos una variable booleana para saber si está autenticado
  const isAuthenticated = !!token;

  // El return debe ir FUERA de la función login
  return { token, isAuthenticated, login, logout };
};