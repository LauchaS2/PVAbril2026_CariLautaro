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


    const dniNum = formulario.dni;
    if ( dniNum < 999999 || dniNum > 100000000) {
      alert("El DNI debe ser un número válido entre 999,999 y 100,000,000."); //hacemos que valide el rango valido del dni
      return;
    }

    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; //le damos a la variable los datos validos que puede usar el campo
    if (!soloLetras.test(formulario.nombre) || !soloLetras.test(formulario.apellido)) { //comprovbamos si lo que escribio el usuario encaja con la condicion
      alert("Nombre y Apellido solo pueden contener letras.");
      return;
    }
    
    const hoy = new Date();
    const fechaNac = new Date(formulario.fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear(); //sacamos la edad
    const mes = hoy.getMonth() - fechaNac.getMonth(); // vemos si ya paso el mes de cumpleaños
   
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;  // se hace un condicional para saber si ya cumplio años este año
    }

    if (edad < 18) {
      alert("Debes ser mayor de 18 años para registrarte.");
      return;
    }

   
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
            <input className="login-input" type="number" name="dni" placeholder="DNI" onChange={manejarCambio} required />
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