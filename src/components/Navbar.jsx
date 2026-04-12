import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const { usuario, cerrarSesion } = useContext(AuthContext);

  // Esta función se encarga de la decisión lógica
  const mostrarOpcionesDeUsuario = () => {
    if (usuario) {
      // si hay alguien logeado, muestra esto
      return (
        <>
        

          <button onClick={cerrarSesion}>Cerrar Sesión</button>
        </>
      );
    } else {
      // si no, muestra esto
      return (
        <>
          <Link to="/login">Iniciar Sesión</Link>

          <Link to="/register">Registrarse</Link>
        </>
      );
    }
  };

  return (
    <nav>
      <h1>Caserón Antiguo</h1>
      <div>
        {mostrarOpcionesDeUsuario()}
      </div>
    </nav>
  );
};