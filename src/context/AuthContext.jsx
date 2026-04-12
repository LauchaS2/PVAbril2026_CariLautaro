import { createContext, useState } from "react";


//crea el contexto, en si, no hace nada, pero define el medio por el cual 
//vamos a transmitir la info del usuario.
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  //  login
  const iniciarSesion = (email, password) => {
    // busca en la lista
    const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // compara
    const usuarioEncontrado = listaUsuarios.find(u => 
      u.email === email && u.password === password
    );

    // si encuentra, avisa que el usuario se logeo
    if (usuarioEncontrado) {
      setUsuario(usuarioEncontrado);
      return true;
    }

    return false;
  };

  //  registro
  const registrarUsuario = (nuevoUsuario) => {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // 1. Buscamos si ya existe alguien con ese DNI o Email
  const existe = usuarios.find(u => u.dni === nuevoUsuario.dni || u.email === nuevoUsuario.email);

  if (existe) {
    alert("Error: El DNI o Email ya se encuentra registrado.");
    return false; // Cortamos la ejecución aquí
  }

  // 2. Si no existe, lo agregamos
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  return true;
};

  //  deslogearse
  const cerrarSesion = () => {
    setUsuario(null);
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