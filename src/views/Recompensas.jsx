import { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { getProducts, canjearProducto } from '../services/productService';
import { AuthContext } from '../context/AuthContext';

function Recompensas() {
  const { token, usuario, actualizarPuntos } = useContext(AuthContext);
  
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [puntosUsuario, setPuntosUsuario] = useState(usuario?.puntosAcumulados || 0); 
  
  const [toast, setToast] = useState({ visible: false, texto: '', tipo: 'exito' });
  
  const mostrarNotificacion = (texto, tipo = 'exito') => {
    setToast({ visible: true, texto, tipo });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4000); 
  };

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      const datosDelBackend = await getProducts(token); 
      setProductos(datosDelBackend);
      setCargando(false);
    };

    if (token) {
      cargarDatos();
    }
  }, [token]);

const handleCanjear = async (producto) => {
    try {
      const respuesta = await canjearProducto(token, usuario.email, producto._id);
      const nuevoSaldo = respuesta.ticket.saldoRestante;
      setPuntosUsuario(nuevoSaldo);
      actualizarPuntos(nuevoSaldo); // Guarda el saldo real en localStorage
      mostrarNotificacion(`🎉 ¡Canje exitoso! Disfrutá tu ${producto.nombre}`, 'exito');
    } catch (error) {
      console.error('Error en el canje:', error);
      mostrarNotificacion(`❌ ${error.message}`, 'error');
    }
  };

  return (
    <div className="layout-recompensas">
      <Navbar paciente={usuario?.nombre || "Usuario"} puntosTotales={puntosUsuario} />

      <div className="contenedor-principal">
        <h1 className="titulo-recompensas">Recompensas</h1>
        <p className="subtitulo-recompensas">Catálogo exclusivo</p>
        
        {cargando ? (
          <p className="mensaje-carga">Cargando catálogo exclusivo...</p>
        ) : (
          <div className="grilla-productos">
            {productos.length === 0 ? (
              <p className="mensaje-vacio">No hay productos disponibles en este momento.</p>
            ) : (
              productos.map((producto) => (
                <ProductCard 
                  key={producto._id} 
                  titulo={producto.nombre} 
                  categoria={producto.descripcion || "Salud y Bienestar"} 
                  puntos={producto.puntosOtorga} 
                  imagenUrl={producto.imagenUrl || "/images/logo-dalton.svg"} 
                  onCanjear={() => handleCanjear(producto)}
                />
              ))
            )}
          </div>
        )}
      </div>

      {toast.visible && (
        <div className={`toast-notificacion ${toast.tipo}`}>
          <span>{toast.texto}</span>
        </div>
      )}
    </div>
  );
}

export default Recompensas;