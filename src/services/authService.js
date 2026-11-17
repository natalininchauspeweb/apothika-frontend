const API_URL = 'http://localhost:3000/api';

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Credenciales incorrectas');
  }

  return data;
};

export const registerUser = async (nombre, email, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password, rol: 'paciente' })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Error al registrar el usuario');
  }

  return data;
};