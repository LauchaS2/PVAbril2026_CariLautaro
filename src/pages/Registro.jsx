import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Registro() {
  const { registrarUsuario } = useContext(AuthContext);

  const [formulario, setFormulario] = useState({
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

    registrarUsuario(formulario);
    alert("Usuario registrado correctamente");
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h2>Registro</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={manejarCambio}
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={manejarCambio}
      />

      <button type="submit">Registrarse</button>
    </form>
  );
}

export default Registro;