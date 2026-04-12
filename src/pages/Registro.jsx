import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Registro() {
  const { registrarUsuario } = useContext(AuthContext);

  const [formulario, setFormulario] = useState({
    dni: "",
    apellido: "",
    nombre: "",
    fechaNacimiento: "",
    tipo: "Pasajero", // valor por defecto
    nacionalidad: "Argentina", // valor por defecto
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
      alert("Usuario registrado");
    } else {
      alert("Error, ya existe");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Registro de Pasajero - Caserón Antiguo</h2>
      <form onSubmit={manejarSubmit}>
        
        <input type="text" name="dni" placeholder="DNI (Clave Primaria)" onChange={manejarCambio} required />
        <input type="text" name="apellido" placeholder="Apellido" onChange={manejarCambio} required />
        <input type="text" name="nombre" placeholder="Nombre" onChange={manejarCambio} required />
        
        <label>Fecha de Nacimiento: </label>
        <input type="date" name="fechaNacimiento" onChange={manejarCambio} required />

        <select name="nacionalidad" onChange={manejarCambio}>
          <option value="Argentina">Argentina</option>
          <option value="Bolivia">Bolivia</option>
          <option value="Chile">Chile</option>
          <option value="Paraguay">Paraguay</option>
          <option value="Uruguay">Uruguay</option>
        </select>

        <select name="tipo" onChange={manejarCambio}>
          <option value="Pasajero">Pasajero</option>
          <option value="Administrador">Administrador</option>
        </select>

        <input type="email" name="email" placeholder="Email" onChange={manejarCambio} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={manejarCambio} required />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Registro;