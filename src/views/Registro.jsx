import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (nombre.trim().length < 2) {
      setError('Por favor, ingresá tu nombre.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Por favor, ingresá un correo electrónico válido.');
      return;
    }

    if (password.trim().length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setCargando(true);

    try {
      await registerUser(nombre, email, password);
      navigate('/login');
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
        <h2 className="titulo-login">Crear cuenta en Apothika</h2>

        <form onSubmit={handleSubmit} className="formulario-login" noValidate>
          <div className="grupo-input">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Julieta"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="input-login"
            />
          </div>

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
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-login"
            />
          </div>

          <button type="submit" className="boton-login" disabled={cargando}>
            {cargando ? 'Registrando...' : 'Registrarme'}
          </button>
        </form>

        {error && <div className="mensaje-error-login">{error}</div>}

        <p className="link-autenticacion">
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;