import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("sesion")) || null
  );


  const navigate = useNavigate(); 


  const iniciarSesion = (email, password) => {
    const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = listaUsuarios.find(u => 
      u.email === email && u.password === password
    );

    if (usuarioEncontrado) {
      setUsuario(usuarioEncontrado);
      localStorage.setItem("sesion", JSON.stringify(usuarioEncontrado));
      return true;
    }
    return false;
  };

  const registrarUsuario = (nuevoUsuario) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.find(u => u.dni === nuevoUsuario.dni || u.email === nuevoUsuario.email);

    if (existe) {
      alert("Error: El DNI o Email ya se encuentra registrado.");
      return false;
    }

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    return true;
  };


  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem("sesion");
    navigate("/"); 
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        iniciarSesion,
        registrarUsuario,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};