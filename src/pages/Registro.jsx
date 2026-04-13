import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/Login.css"; 

function Registro() {
  const { registrarUsuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    dni: "",
    apellido: "",
    nombre: "",
    fechaNacimiento: "",
    tipo: "Pasajero",
    nacionalidad: "Argentina",
    email: "",
    password: "",
  });

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    const exito = registrarUsuario(formulario);
    if (exito) {
      alert("¡Usuario registrado con éxito!");
      navigate("/login");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-titulo">Crear Cuenta</h2>
        <p className="login-subtitulo">Completá tus datos para El Caserón Antiguo</p>

        <form className="login-form" onSubmit={manejarSubmit}>
          
          <div className="form-group">
            <label>Documento (DNI)</label>
            <input className="login-input" type="text" name="dni" placeholder="DNI" onChange={manejarCambio} required />
          </div>

          <div className="form-group">
            <label>Nombre Completo</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input className="login-input" type="text" name="nombre" placeholder="Nombre" onChange={manejarCambio} required />
              <input className="login-input" type="text" name="apellido" placeholder="Apellido" onChange={manejarCambio} required />
            </div>
          </div>

          <div className="form-group">
            <label>Fecha de Nacimiento</label>
            <input className="login-input" type="date" name="fechaNacimiento" onChange={manejarCambio} required />
          </div>

          <div className="form-group">
            <label>Nacionalidad</label>
            <select className="login-input" name="nacionalidad" value={formulario.nacionalidad} onChange={manejarCambio}>
              <option value="Argentina">Argentina</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Chile">Chile</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Uruguay">Uruguay</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tipo de Usuario</label>
            <select className="login-input" name="tipo" value={formulario.tipo} onChange={manejarCambio}>
              <option value="Pasajero">Pasajero</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input className="login-input" type="email" name="email" placeholder="Email" onChange={manejarCambio} required />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input className="login-input" type="password" name="password" placeholder="Contraseña" onChange={manejarCambio} required />
          </div>

          <button className="btn-login" type="submit">Finalizar Registro</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;