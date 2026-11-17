import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validación de datos en el Frontend
    if (!email.trim() || ! email.includes('@')) {
      setError('Por favor, ingresá un correo electrónico válido.');
      return;
    }

    if (password.trim().length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setCargando(true);

    try {
      const data = await loginUser(email, password);
      login(data.token, data.usuario);
      navigate('/recompensas');
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="layout-login">
      <div className="tarjeta-login">
        <img src="/images/logo-dalton.svg" alt="Farmacia Dalton" className="logo-login" />
        <h2 className="titulo-login">Ingreso a Apothika</h2>
        
        <form onSubmit={handleSubmit} className="formulario-login" noValidate>
          <div className="grupo-input">
            <label htmlFor="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email"
              placeholder="julieta@ejemplo.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="input-login"
            />
          </div>
          
          <div className="grupo-input">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password"
              placeholder="********" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="input-login"
            />
          </div>
          
          <button type="submit" className="boton-login" disabled={cargando}>
            {cargando ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>
        
        {error && <div className="mensaje-error-login">{error}</div>}
      </div>
    </div>
  );
};

export default Login;