import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/Login.css"; 

function Login() {
  const { iniciarSesion } = useContext(AuthContext);
  const navigate = useNavigate();

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
      navigate("/"); 
    } else {
      alert("Email o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-titulo">Ingreso a la Casona</h2>
        <p className="login-subtitulo">Gestioná tu estadía con nosotros</p>
        
        <form className="login-form" onSubmit={manejarSubmit}>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              name="email" 
              placeholder="ejemplo@correo.com" 
              onChange={manejarCambio} 
              required 
              className="login-input"
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              onChange={manejarCambio} 
              required 
              className="login-input"
            />
          </div>

          <button type="submit" className="btn-login">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;