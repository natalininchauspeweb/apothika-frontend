const API_URL = 'http://localhost:3000/api';

export const getProducts = async (token) => {
  try {
    const response = await fetch(`${API_URL}/productos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Error al cargar los productos del backend');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error de conexión en getProducts:', error);
    return []; 
  }
};

export const canjearProducto = async (token, emailPaciente, idProducto) => {
  const response = await fetch(`${API_URL}/transacciones/canjear`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ emailPaciente, idProducto })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Saldo insuficiente o error en el servidor');
  }

  return data;
};