import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ paciente, puntosTotales }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div>
        <img 
          src="/images/logo-dalton.svg" 
          alt="Logo Farmacia Dalton" 
          className="navbar-logo-img" 
        />
      </div>

      <div className="navbar-perfil">
        <span className="navbar-saludo">
          Hola, {paciente}
        </span>
        
        <div className="billetera-puntos">
          🪙 {puntosTotales} pts
        </div>

        <button onClick={handleLogout} className="btn-logout">
          Salir
        </button>
      </div>
    </nav>
  );
};

export default Navbar;