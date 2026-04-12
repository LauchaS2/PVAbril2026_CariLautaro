import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // hook, para poder redirigir a las paginas 

function Login() {
  const { iniciarSesion } = useContext(AuthContext);
  const navigate = useNavigate(); // despues del login, lo manda a home

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const manejarCambio = (e) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    const exito = iniciarSesion(credenciales.email, credenciales.password);

    if (exito) {
      alert("¡Ingreso exitoso!");
      navigate("/"); // lo devuelve al home
    } else {
      alert("Email o contraseña incorrectos.");
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h2>Iniciar Sesión</h2>
      <input type="email" name="email" placeholder="Email" onChange={manejarCambio} required />
      <input type="password" name="password" placeholder="Password" onChange={manejarCambio} required />
      <button type="submit">Ingresar</button>
    </form>
  );
}

export default Login;