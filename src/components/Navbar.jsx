import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/Navbar.css';



export const Navbar = () => {
  const { usuario, cerrarSesion } = useContext(AuthContext);

  const mostrarOpcionesDeUsuario = () => {
    if (usuario) {
      return (
        <>
          <Link to="/">Inicio</Link>
          <Link to="/gestion">Habitaciones</Link>
          <Link to="/Reservas">Mis Reservas</Link>
          <span className="user-name">| {usuario.nombre} |</span>
          <button className="btn-logout" onClick={cerrarSesion}>
            Cerrar Sesión
          </button>
        </>
      );
    } else {
      return (
        <>
          <Link to="/login">Iniciar Sesión</Link>
          <Link to="/register">Registrarse</Link>
        </>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          El Caserón Antiguo
        </Link>
      </div>
      <div className="navbar-links">
        {mostrarOpcionesDeUsuario()}
      </div>
    </nav>
  );
};