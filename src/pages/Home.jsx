import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function Home() {
  const { usuario } = useContext(AuthContext);

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>Bienvenido {usuario.nombre}</h2>
      <p>Estas logueado anashe</p>
    </div>
  );
}

export default Home;