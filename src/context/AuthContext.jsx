import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  const login = (nuevoToken, datosUsuario) => {
    localStorage.setItem('token', nuevoToken);
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
    setToken(nuevoToken);
    setUsuario(datosUsuario);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
  };

  // Sincroniza el nuevo saldo tanto en React como en localStorage para que no falle al actualizar la página
  const actualizarPuntos = (nuevoSaldo) => {
    setUsuario((prev) => {
      if (!prev) return null;
      const usuarioActualizado = { ...prev, puntosAcumulados: nuevoSaldo };
      localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
      return usuarioActualizado;
    });
  };

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout, actualizarPuntos }}>
      {children}
    </AuthContext.Provider>
  );
};